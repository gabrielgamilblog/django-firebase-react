from django.db import models
from django.urls import reverse

from .signals import cache_todo


class ToDo(models.Model):
    name = models.CharField(max_length=255)
    is_done = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('dash')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        cache_todo.send(sender=self.__class__, todo_data={"id": self.pk, "name": self.name, "is_done": self.is_done})