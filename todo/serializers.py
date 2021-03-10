from rest_framework import serializers

from .models import ToDo


class TodoDoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['is_done']
