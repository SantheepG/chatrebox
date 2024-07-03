from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'NkzHfSij8zXNrlOn5sBcV0kQ4jhrd6zIoyx9GqL5W1E'
socketio = SocketIO(app)

ROOM = "chatroom"

@app.route('/')
def home():
    return 'working'

@socketio.on('connect')
def handle_connect():
    join_room(ROOM)
    print('Client connected')
    emit('message', {'data': 'Connected to server and joined room'}, room=ROOM)

@socketio.on('disconnect')
def handle_disconnect():
    leave_room(ROOM)
    print('Client disconnected')

@socketio.on('message')
def handle_message(data):
    print('Received message: ' + data)
    emit('message', {'data': data}, room=ROOM)

if __name__ == '__main__':
    socketio.run(app, debug=True)
