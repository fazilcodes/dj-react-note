from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name='notes'),
    path('notes/<int:id>/update/', views.updateNote, name='update_note'),

    path('notes/<int:id>', views.getNote, name='note'),
]