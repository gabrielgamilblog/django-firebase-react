# Demo showing basic Django integration with Firebase

## Structure
The demo project has a default Django project layout.

The project has one single app named "todo".
Within the "todo" app there are several directories one of which is not standart: "jsapp".

This directory contains the source code for the React app used on one of the web pages.
This react app uses Firebase to fetch active todo's and render them as a table.
It also enables checking these todo's as done by sending a PUT HTTP request to the Django app.
The built javascript app resides int "todo/static/js/main.js" - location that Django uses to get static files from.

# Major Django libraries used
- Django REST Framework
- Firebase Python Admin SDK
- Crispy forms

# Core design ideas
The demo project uses Firebase's Firestore as a cache. 
A pattern that is frequenty used if one has to use Materialized Views pattern or wants to quickly add real time functionality to the app.

The data is always saved in the main database vie Django ORM (default use case).
When the Todo model save method is called it sends a custom signal.
This custom signal is handled in the "todo.firebase" module which uses the Friebase SDK to save the data in Firestore's document.
All the quering (read) is done via Firestore.

# Pages
## Dashboard page
This page displays a list of currently active todo's and a link to the todo create page. 

The list of currently active todo's is rendered by the javascript app which listens and fetches the data directly from Firesore. 
If at some point the list of todo's changes this will be immediately seen. Basically we have real time functionality here thanks to Firestore listeners.

The list is a table. Each row contains the todo itself and a checkbox. When checked the app sends a PUT request to the Django backend to mark the todo as done.
Then the update is being sent to Firestore using the same custom signal as when the tot was previously created.
## Create form page
This page displays the create todo form.
Form is rendered by using the class based Django CreateView.
