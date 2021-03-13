from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase

from .models import ToDo


class ToDoTestCase(TestCase):
    def test_create_todo(self):
        response = self.client.post(reverse('create-todo'), {'name': 'Test my todo'})
        self.assertEqual(response.status_code, 302)
        self.assertEqual(ToDo.objects.count(), 1)


    def test_dash(self):
        response = self.client.get(reverse('dash'))
        self.assertEqual(response.status_code, 200)


class AccountTests(APITestCase):
    def setUp(self) -> None:
        self.todo = ToDo.objects.create(name='run tests')

    def test_update(self):
        self.assertEqual(ToDo.objects.filter(is_done=True).exists(), False)

        response = self.client.put(reverse('update-todo-done', kwargs={'pk': self.todo.pk}), {'is_done': True})
        self.assertEqual(response.status_code, 200)

        self.assertEqual(ToDo.objects.filter(is_done=True).exists(), True)
