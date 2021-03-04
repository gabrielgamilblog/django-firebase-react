from django.db import models


class ToDo(models.Model):
    name = models.CharField(max_length=255)
    is_done = models.BooleanField(default=False)
