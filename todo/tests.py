from django.test import TestCase
from django.urls import reverse

from .models import ToDo


class ToDoTestCase(TestCase):
    def test_create_todo(self):
        response = self.client.post(reverse('create-todo'), {'name': 'Test my todo'})
        self.assertEqual(response.status_code, 302)
        self.assertEqual(ToDo.objects.count(), 1)


    def test_dash(self):
        response = self.client.get(reverse('dash'))
        self.assertEqual(response.status_code, 200)
