import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";

import { UsersService } from "./users.service";
import { UserTokenDto } from "./dto/token-.dto";

@Controller("users")
@ApiTags("User")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @ApiBearerAuth()
  @Post("checkClass")
  async checkClass(@Body() userDto: UserTokenDto, @Req() req) {
    return this.usersService.api_checkClass(userDto);
  }
}
