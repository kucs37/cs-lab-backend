import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindSubjectByIdDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly subjectId: string;
 
}
