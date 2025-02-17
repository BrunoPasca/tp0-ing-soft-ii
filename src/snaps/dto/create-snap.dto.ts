import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSnapDto {
  @ApiProperty({
    description: 'The message of the snap',
    example: 'This is a new snap',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
