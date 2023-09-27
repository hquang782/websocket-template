import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway  {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    // Xử lý khi một client kết nối đến
    const clientId = client.id;
    this.connectedClients.set(clientId, client);
    console.log(`Client connected: ${clientId}`);
  }

  handleDisconnect(client: Socket) {
    // Xử lý khi một client ngắt kết nối
    const clientId = client.id;
    this.connectedClients.delete(clientId);
    console.log(`Client disconnected: ${clientId}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    // Xử lý khi client tham gia vào một phòng (room)
    client.join(room);
    console.log(`Client ${client.id} joined room: ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    // Xử lý khi client rời khỏi một phòng (room)
    client.leave(room);
    console.log(`Client ${client.id} left room: ${room}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, message: any) {
    // Xử lý khi client gửi một tin nhắn vào phòng (room)
    console.log('ki');
    console.log(message);

    this.server.emit('newMessage', { message, sender: client.id });
  }
}
