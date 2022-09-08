import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { config } from "dotenv";
import { LogService } from '../../services/log/log.service';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new LogService(JwtStrategy.name);

  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    this.logger.debug("JwtStrategy Payload ->", payload);
    const user = await this.authService.validateUserByJwt(payload);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
