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
  private clientId = new Set();
  afterInit(server: Socket) {
    //
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`${this.handleDisconnect.name}`, client.id);
    this.clientId.delete(client.id);
    this.server.emit("userCount", { userCount: this.clientId.size });
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(`${this.handleConnection.name} -> `, client.id);
    this.server.emit("userCount", { userCount: this.clientId.size });
    // console.log(this.users);
  }

  @SubscribeMessage("heartbeat")
  async checkIn(
    @ConnectedSocket() client: Socket,
    @MessageBody() token: string
  ) {
    const result = await this.jwtService.verifyAsync(token);
    if (!result) throw new UnauthorizedException();
    this.clientId.add(client.id); // todo
    this.server.emit("userCount", { userCount: this.clientId.size });
    console.log("checkIn Success");
  }
}
