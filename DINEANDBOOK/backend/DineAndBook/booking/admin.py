from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'date', 'time']
    search_fields = ['first_name', 'last_name', 'email']
