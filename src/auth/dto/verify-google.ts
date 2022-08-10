import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyGoogleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
