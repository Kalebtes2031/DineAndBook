from django.db import models

class Booking(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=250)
    phone_number = models.CharField(max_length=25)
    people = models.PositiveIntegerField(default=1)
    date = models.DateField()
    time = models.TimeField()

    class Occasion(models.TextChoices):
        NONE = "None", "None"
        BIRTHDAY = "Birthday", "Birthday"
        ANNIVERSARY = "Anniversary", "Anniversary"
        ENGAGEMENT = "Engagement", "Engagement"
        OTHER = "Other", "Other"

    class SeatingPreferences(models.TextChoices):
        NONE = "None", "None"
        INDOORS = "Indoors", "Indoors"
        PATIO = "Outdoor (Patio)", "Outdoor (Patio)"
        SIDEWALK = "Outdoor (Sidewalk)", "Outdoor (Sidewalk)"

    occasion = models.CharField(
        max_length=20,
        choices=Occasion.choices,
        default=Occasion.NONE,
    )

    seating_preferences = models.CharField(
        max_length=20,
        choices=SeatingPreferences.choices,
        default=SeatingPreferences.NONE,
    )

    additional_comments = models.TextField(default='If none, leave field as is', max_length=3000)

    def __str__(self):
        return f"{self.date}: {self.time}"
