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
import { Cache } from "cache-manager";
import { EntityEnum } from "../db/enum/entities-enum";
import { User } from "../db/entities/user.entity";
import { LogService } from "../services/log/log.service";
import { UsersService } from "./users.service";

import { Role } from "./../db/entities/role.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityEnumMongo } from "../database/entity";
import { UserDB, RoleDB } from "../database/schema/user.schema";
import { UserCache } from "../services/interface/userCache.interface";

@Injectable()
export class UserAuthService implements OnApplicationBootstrap {
  private logger = new LogService(UserAuthService.name);
  private keyCache = "user";

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(EntityEnumMongo.userDB) private userModel: Model<UserDB>,
    // @InjectModel(EntityEnumMongo.roleDB) private roleDB: Model<RoleDB>,
    private userService: UsersService,
    @Inject(EntityEnum.userDB)
    private userDB: typeof User // @InjectModel(EntityEnum.userDB) private userModel: Model<UserDB>,
  ) {}
  async onApplicationBootstrap() {
    // this.clearCache();
    // this.findUser("kittikun.bu@ku.th")
  }

  async findUser(email: string): Promise<UserCache> {
    const tag = this.findUser.name;
    try {
      // ─────────────────────────────────────────────────────────────────
      const resultCache = await this.getCache(email);
      if (resultCache) {
        this.logger.debug(`${tag} data from cache.`);
        return resultCache;
      }

      // ─────────────────────────────────────────────────────────────────
      const result = await this.userModel.findOne({ email: email }).select('-__id, -__v');
      // await this.userDB.findOne({
      //   where: { email: email },
      // });
      if (!result) {
        const userCache: UserCache = {
          inClass: false,
          studentId: null,
          firstName: null,
          lastName: null,
          role: [],
          // email: "",
        };
        return userCache;
      }
      this.logger.debug(`${tag} result -> `, result);

      const userCache: UserCache = {
        inClass: true,
        studentId: result.studentId,
        firstName: result.firstName,
        lastName: result.lastName,
        role: await this.userService.getRole(result.studentId)
      };
      console.log(userCache);

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
      `${this.keyCache}-${data.studentId}`,
      JSON.stringify(data),
      {
        ttl: 60 * 5,
      }
    );
  }

  private async getCache(email: string) {
    const result = await this.cacheManager.get(`${this.keyCache}-${email}`);
    if (result) {
      const userCache: UserCache = JSON.parse(`${result}`);
      return userCache;
    }
    return null;
  }

  private async delCache(email: string) {
    const result = await this.getCache(email);
    if (result) this.cacheManager.del(`${this.keyCache}-${email}`);
  }

  private async clearCache() {
    await this.cacheManager.reset();
  }
}

