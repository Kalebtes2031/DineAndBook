from django.contrib import admin
from .models import Category, MenuItem,Order,OrderItem,Cart, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_superuser','is_active','date_joined')  # Adjust the fields as needed
    search_fields = ('username', 'email')

admin.site.register(Category)
admin.site.register(MenuItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Cart)