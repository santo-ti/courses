import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Title of the Course',
    required: true,
    nullable: false,
  })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Description of the Course',
    required: true,
    nullable: false,
  })
  readonly description: string;
}
