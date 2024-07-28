from django.urls import path
from . import views


urlpatterns = [
    path('exists', views.check_username_exists, name='exists'),
    path('home', views.home, name='home'),
    path('menu/', views.MenuItemView.as_view(), name="menu"),
    path('menu/<int:pk>/', views.SingleMenuItemView.as_view(), name="menu_item"),
    path('cart/', views.Carts.as_view(), name="cart"),
     path('cart/<int:pk>/', views.UpdateCartItemView.as_view(), name="update_cart_item"),
    path('cart/delete/<int:pk>/', views.DeleteCartItemView.as_view(), name="delete_cart_item"),
    path('orders/', views.OrdersView.as_view(), name="orders"),
    path('orders/<int:pk>/', views.SingleOrderView.as_view(), name='order_item'),
    path('groups/manager/users/', views.ManagerUsersView.as_view()),
    path('groups/manager/users/<int:pk>/', views.SingleManagerUserView.as_view()),
    path('groups/delivery-crew/users/', views.DeliveryCrewView.as_view()),
    path('groups/delivery-crew/users/<int:pk>/', views.SingleDeliveryCrewView.as_view()),
]