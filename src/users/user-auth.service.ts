/*
https://docs.nestjs.com/providers#services
*/
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnApplicationBootstrap,
} from "@nestjs/common";
// import { InjectModel } from '@nestjs/mongoose';
import { Cache } from "cache-manager";
import { User } from "../db/entities/user.entity";
import { LogService } from "../services/log/log.service";
// import { Model } from 'mongoose';
// import { EntityEnum } from './../database/entity';
// import { UserDB } from './../database/schema/user.schema';

@Injectable()
export class UserAuthService implements OnApplicationBootstrap {
  private logger = new LogService(UserAuthService.name);
  private keyCache = "user";

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject("USERS_REPOSITORY")
    private userDB: typeof User // @InjectModel(EntityEnum.userDB) private userModel: Model<UserDB>,
  ) {}
  async onApplicationBootstrap() {
    this.clearCache();
  }

  async findUser(id: string): Promise<UserCache> {
    const tag = this.findUser.name;
    try {
      // ─────────────────────────────────────────────────────────────────
      const resultCache = await this.getCache(id);
      if (resultCache) {
        this.logger.debug(`${tag} data from cache.`);
        return resultCache;
      }

      // ─────────────────────────────────────────────────────────────────
      const result = await this.userDB.findOne({
        where: { user_id: id },
      });

      this.logger.debug(`${tag} result -> `, result);

      const userCache: UserCache = {
        _id: String(result.user_id),
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      };

      this.logger.debug(`${tag} data from DB.`);
      this.setCache(userCache);
      return userCache;
    } catch (error) {
      this.logger.error(`${tag} -> `, error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // cache ────────────────────────────────────────────────────────────────────────────────

  private setCache(data: UserCache) {
    this.cacheManager.set(
      `${this.keyCache}-${data._id}`,
      JSON.stringify(data),
      {
        ttl: 60 * 5,
      }
    );
  }

  private async getCache(id: string) {
    const result = await this.cacheManager.get(`${this.keyCache}-${id}`);
    if (result) {
      const userCache: UserCache = JSON.parse(`${result}`);
      return userCache;
    }
    return null;
  }

  private async delCache(id: string) {
    const result = await this.getCache(id);
    if (result) this.cacheManager.del(`${this.keyCache}-${id}`);
  }

  private async clearCache() {
    await this.cacheManager.reset();
  }
}

export interface UserCache {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
