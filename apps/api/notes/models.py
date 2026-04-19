from django.db import models


class Note(models.Model):
    class Category(models.TextChoices):
        WORK = "Work", "Work"
        STUDY = "Study", "Study"
        PERSONAL = "Personal", "Personal"

    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=Category.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title
