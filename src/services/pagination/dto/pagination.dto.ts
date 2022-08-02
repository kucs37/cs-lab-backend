import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  perPages: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sortFide: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sortType: string;
}
