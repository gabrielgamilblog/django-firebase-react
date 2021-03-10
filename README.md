# Demo showing basic Django integration with Firebase

## Structure
The demo project represents a basic Django project layout. 
The project has one single app names "todo".
Within the "todo" app there are several directories one of which is non standard: "jsapp".
This directory contains the source code for the React app used on one of the web pages.
This react app uses Firebase to fetch active todo's and render them as a table.
It also enables checking these todo's as done by sending a PUT HTTP request to the Django app.
The built javascript app resides int "todo/static/js/main.js".

# Main Django libraries used
- Django REST Framework
- Firebase Python Admin SDK

# Core design ideas
THe demo project uses Firebase's Firestore as a cache. A pattern that is frequenty used if one has to use Materialized Views pattern or wants to quickly add real time functionality to the app.
The data is always saved in the main database vie Django ORM (default use case).
When the Todo model save method is called it sends a custom signal.
This custom signal is handled in the todo.firebase module which uses the Friebase SDK to save the data in Firestore's document.
All the quering is done via Firestore.

# API endpoints
