from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(req):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)


@api_view(["GET"])
def getNotes(req):
    notes = Note.objects.all()
    serialzer = NoteSerializer(notes, many=True)
    return Response(serialzer.data)


@api_view(['POST'])
def createNote(req):
    serializer = NoteSerializer(data=req.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)


@api_view(["GET"])
def getNote(req, id):
    notes = Note.objects.get(id=id)
    serialzer = NoteSerializer(notes, many=False)
    return Response(serialzer.data)


@api_view(['PUT'])
def updateNote(req, id):
    note = Note.objects.get(id=id)
    serializer = NoteSerializer(note, data=req.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(req, id):
    note = Note.objects.get(id=id)
    note.delete()
    return Response('Not was Deleted')