from rest_framework import status, generics
from .serializers import CustomTokenObtainPairSerializer, MenuItemSerializer, UserSerializer, UserCartSerializer, UserOrdersSerializer
from .models import MenuItem, OrderItem, Cart, Order, User
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from decimal import Decimal
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import get_user_model
from decimal import Decimal
from decouple import config
import requests
from rest_framework_simplejwt.views import TokenObtainPairView



User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def check_username_exists(request):
    if not request.data.get('username'):
        return Response({'error': 'Bad_request'}, status=status.HTTP_400_BAD_REQUEST)

    username = request.data.get('username')
    try:
        User.objects.get(username=username)
        return Response({'username_exists': True}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({'username_exists': False}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def home(request):
    return Response({'detail': 'Welcome to the tutorial'}, status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(username=request.data.get('username'))
            if not user.is_active:
                return Response({'detail': 'Account not activated'}, status=status.HTTP_401_UNAUTHORIZED)
            if user.is_deactivated:
                return Response({'detail': 'Account deactivated'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

        return super().post(request, *args, **kwargs)

@api_view(['GET'])
@permission_classes([AllowAny])
def CustomUserActivate(request, uid, token):
    """
    Intermediate view to activate a user's email.
    """
    post_url = f"{config('SITE_URL')}/auth/users/activation/"
    post_data = {"uid": uid, "token": token}
    result = requests.post(post_url, data=post_data)

    return Response('Thank you for activating your account you can now go back to the main site')

class MenuItemView( generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    ordering_fields = ['price']
    search_fields = ['title']
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [AllowAny()]

class SingleMenuItemView(generics.RetrieveUpdateDestroyAPIView, generics.RetrieveAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'PUT' \
                or self.request.method == 'DELETE' or self.request.method == 'PATCH':
            return [IsAdminUser()]
        return [AllowAny()]

class Carts(generics.ListCreateAPIView):
    serializer_class = UserCartSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user)

    def perform_create(self, serializer):
        menuitem = self.request.data.get('menuitem')
        quantity = self.request.data.get('quantity')
        unit_price = MenuItem.objects.get(pk=menuitem).price
        quantity = int(quantity)
        price = quantity * unit_price
        serializer.save(user=self.request.user, price=price)

    def delete(self, request):
        user = self.request.user
        Cart.objects.filter(user=user).delete()
        return Response(status=204)
    
class UpdateCartItemView(generics.UpdateAPIView):
    serializer_class = UserCartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user)

    def put(self, request, *args, **kwargs):
        cart_item = self.get_object()
        quantity = request.data.get('quantity')
        if quantity is not None:
            quantity = int(quantity)
            unit_price = cart_item.menuitem.price
            cart_item.quantity = quantity
            cart_item.price = quantity * unit_price
            cart_item.save()
            
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Quantity not provided'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteCartItemView(generics.DestroyAPIView):
    serializer_class = UserCartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user)

class OrdersView(generics.ListCreateAPIView):
    serializer_class = UserOrdersSerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
    def perform_create(self, serializer):
        cart_items = Cart.objects.filter(user=self.request.user)
        total = self.calculate_total(cart_items)
        order = serializer.save(user=self.request.user, total=total)

        for cart_item in cart_items:
            OrderItem.objects.create(
                menuitem=cart_item.menuitem, 
                quantity=cart_item.quantity,
                unit_price=cart_item.menuitem.price,
                price=cart_item.price, order=order
                )
            cart_item.delete()

    def get_queryset(self):
        user = self.request.user
        # if user.groups.filter(name='Manager').exists():
        #     return Order.objects.all()
        return Order.objects.filter(user=user)

    def calculate_total(self, cart_items):
        total = Decimal(0)
        for item in cart_items:
            total += item.price
        return total

class SingleOrderView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserOrdersSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Manager').exists():
            return Order.objects.all()
        return Order.objects.filter(user=user)
    
    def delete(self, request, *args, **kwargs):
        order = self.get_object()
        if order.status:
            return Response({'error': 'Order cannot be deleted'}, status=status.HTTP_400_BAD_REQUEST)
        return super().delete(request, *args, **kwargs)


class ManagerUsersView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        manager_group = Group.objects.get(name='Manager')
        queryset = User.objects.filter(groups=manager_group)
        return queryset

    def perform_create(self, serializer):
        manager_group = Group.objects.get(name='Manager')
        user = serializer.save()
        user.groups.add(manager_group)

class SingleManagerUserView(generics.RetrieveDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        # Get the 'manager' group
        manager_group = Group.objects.get(name='Manager')
        # Get the users in the 'manager' group
        queryset = User.objects.filter(groups=manager_group)
        return queryset

class DeliveryCrewView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        delivery_group = Group.objects.get(name='Delivery crew')
        queryset = User.objects.filter(groups=delivery_group)
        return queryset

    def perform_create(self, serializer):
        delivery_group = Group.objects.get(name='Delivery crew')
        user = serializer.save()
        user.groups.add(delivery_group)

class SingleDeliveryCrewView(generics.RetrieveDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        delivery_group = Group.objects.get(name='Delivery crew')
        queryset = User.objects.filter(groups=delivery_group)
        return queryset