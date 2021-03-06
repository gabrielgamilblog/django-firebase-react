from django.dispatch import receiver

import firebase_admin
from firebase_admin import firestore
from .signals import cache_todo

default_app = firebase_admin.initialize_app()
db = firestore.client()


@receiver(cache_todo)
def handle_todo_to_be_cached(sender, **kwargs):
    todo_data = kwargs.get('todo_data')
    db.collection(u'todo').document('%d' % todo_data['id']).set(todo_data)
