from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room, leave_room
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'NkzHfSij8zXNrlOn5sBcV0kQ4jhrd6zIoyx9GqL5W1E'
socketio = SocketIO(app, cors_allowed_origins="*")

ROOM = "chatroom"
clients = {}  # Dictionary to store client information

@app.route('/')
def home():
    return 'working'

@socketio.on('connect')
def handle_connect():
    join_room(ROOM)
    unique_id = request.sid
    print(f'Client connected with ID: {unique_id}')
    # Set default name as user+id
    clients[unique_id] = {'name': f'user_{unique_id}'}

    # Emit the client ID and initial name to the client
    emit('id', {
        'data': 'Connected to server and joined room',
        'id': unique_id,
        'name': clients[unique_id]['name'],
        
    }, room=unique_id)

@socketio.on('disconnect')
def handle_disconnect():
    unique_id = request.sid
    if unique_id in clients:
        del clients[unique_id]
    print(f'Client with ID {unique_id} disconnected')
    emit('active_users', clients, room=ROOM)
    leave_room(ROOM)
    
    # Remove client information from dictionary on disconnect


@socketio.on('message')
def handle_message(data):
    unique_id = request.sid
    print("received ",data)
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    emit('message', {
        'id': unique_id,
        'name': clients[unique_id]['name'],
        'msg': data['msg'],
        'time': current_time
    }, room=ROOM)

@socketio.on('change_name')
def change_name(new_name):
    unique_id = request.sid
    clients[unique_id]['name'] = new_name
    emit('joined_user', clients[unique_id]['name'], room=ROOM)
    emit('active_users', clients, room=ROOM)
    emit('id', {
        'data': 'Connected to server and joined room',
        'id': unique_id,
        'name': clients[unique_id]['name'],
        
    }, room=unique_id)
    
if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
