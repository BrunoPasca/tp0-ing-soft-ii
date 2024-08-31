import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseSnapDto {
  @ApiProperty({
    description: 'The ID of the snap',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The message of the snap',
    example: 'This is a new snap',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
