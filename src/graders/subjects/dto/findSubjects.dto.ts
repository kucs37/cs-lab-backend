import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindSubjectsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly student: string;
 
}
