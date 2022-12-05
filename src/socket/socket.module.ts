import { forwardRef, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { JwtDecodeModule } from '../services/jwt-decode/jwtDecode.module';
import { AuthMiddlewareModule } from '../services/middleware/auth.middleware.module';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtDecodeService } from '../services/jwt-decode/jwtDecode.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => AuthMiddlewareModule),
    forwardRef(() => UsersModule),

  ],
  providers: [SocketGateway, SocketService, JwtStrategy, AuthService],

})
export class SocketModule {}
