import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('studentLogin')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.api_loginUser(loginUserDto);
  }
}
