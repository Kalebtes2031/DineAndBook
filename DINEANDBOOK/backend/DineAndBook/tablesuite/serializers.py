from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Category, MenuItem, Cart, Order, OrderItem, User
from datetime import datetime


user = get_user_model()

# creating new users


class UserCreateSerializer(BaseUserCreateSerializer):

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name', 'last_name','email','username',
                'password',]

    # you can grab the created user and do something with them here
    def create(self, validated_data):

        user = super().create(validated_data)

        return user


class UserSerializer(BaseUserSerializer):
    Date_Joined = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(write_only=True, default=datetime.now)
    email = serializers.EmailField(required=False)
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name',
                  'last_name', 'email',
                  'username',
                  'is_active',
                  'is_deactivated',
                  'date_joined', 'Date_Joined'
                  ]

    def get_Date_Joined(self, obj):
        return obj.date_joined.strftime('%Y-%m-%d')
    
    # this is where we send a request to slash me/ or auth/users
    def validate(self, attrs):
        validated_attr = super().validate(attrs)
        username = validated_attr.get('username')

        user = user.objects.get(username=username)

        if user.is_deactivated:
            raise ValidationError(
                'Account deactivated')

        if not user.is_active:
            raise ValidationError(
                'Account not activated')

        return validated_attr


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        obj = self.user

        if obj.is_deactivated:
            raise ValidationError(
                'Account deactivated. Account deactivated!!')

        if not obj.is_active:
            raise ValidationError(
                'Your account is not activated. go to your email and activate your account')

        data.update({
            'id': obj.id, 'first_name': obj.first_name,
            'last_name': obj.last_name, 'email': obj.email,
            'username': obj.username,
            'is_active': obj.is_active,
            'is_deactivated': obj.is_deactivated,
        })

        return data
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'title', 'price', 'category', 'featured']

class UserCartSerializer(serializers.ModelSerializer):
    unit_price = serializers.DecimalField(max_digits=6, decimal_places=2, source='menuitem.price', read_only=True)
    name = serializers.CharField(source='menuitem.title', read_only=True)

    class Meta:
        model = Cart
        fields = ['id','user_id', 'menuitem', 'name', 'quantity', 'unit_price', 'price']
        extra_kwargs = {
            'price': {'read_only': True}
        }

class OrderItemSerializer(serializers.ModelSerializer):
    unit_price = serializers.DecimalField(max_digits=6, decimal_places=2, source='menuitem.price', read_only=True)
    price = serializers.DecimalField(max_digits=6, decimal_places=2, read_only=True)
    name = serializers.CharField(source='menuitem.title', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['name', 'quantity', 'unit_price', 'price']
        extra_kwargs = {
            'menuitem': {'read_only': True}
        }

class UserOrdersSerializer(serializers.ModelSerializer):
    Date = serializers.SerializerMethodField()
    date = serializers.DateTimeField(write_only=True, default=datetime.now)
    order_items = serializers.SerializerMethodField()
    delivery_crew = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.filter(groups__name='Delivery crew'),
        required = False
    )

    class Meta:
        model = Order
        fields = ['id', 'user', 'delivery_crew', 'status', 'total', 'Date', 'date', 'order_items']
        extra_kwargs = {
            'user': {'read_only': True},
            'total': {'read_only': True}
        }

    def get_Date(self, obj):
        return obj.date.strftime('%Y-%m-%d')

    def get_order_items(self, obj):
        order_items = OrderItem.objects.filter(order=obj)
        serializer = OrderItemSerializer(order_items, many=True, context={'request': self.context['request']})
        return serializer.data