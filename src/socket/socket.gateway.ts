import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { LogService } from "../services/log/log.service";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "/socket",
})
// {
// transports: ['websocket'],
// path: '/realtime',
// cors: {
//     origin: '*',
// },
// }
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new LogService(SocketGateway.name);

  constructor(private jwtService: JwtService) {}
  @WebSocketServer() private server: Server;
  private clientId: string[] = [];
  afterInit(server: Socket) {
    //
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`${this.handleDisconnect.name}`, client.id);
    this.clientId = this.clientId.filter((id) => id !== client.id);
    this.server.emit("userCount", { userCount: this.clientId.length });
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(`${this.handleConnection.name} -> `, client.id);
    this.server.emit("userCount", { userCount: this.clientId.length });
    // console.log(this.users);
  }

  @SubscribeMessage("checkIn")
  async checkIn(
    @ConnectedSocket() client: Socket,
    @MessageBody() token: string
  ) {
    // const result = await this.jwtService.verifyAsync(token);
    // if (!result) throw new UnauthorizedException();
    this.clientId.push(client.id);
    // this.users++;
    this.server.emit("userCount", { userCount: this.clientId.length });
    console.log("checkIn Success");
  }
  // @SubscribeMessage('getUserCount')
  // async onSubscribe(@MessageBody() getUserCount: string) {
  //     this.server.emit('userCount', { userCount: this.users });
  //     console.log('subscribe ->', this.users);
  // }
  // @SubscribeMessage('chat')
  // async broadcast() {
  //     this.logger.debug('send message realtime success');
  //     this.server.emit('events', { topic: 'new' });
  // }
}
