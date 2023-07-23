import { ApiProperty } from '@nestjs/swagger';

export class Course {
  @ApiProperty({
    type: Number,
    description: 'ID',
    required: true,
    nullable: false,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Title of the Course',
    required: true,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Description of the Course',
    required: true,
    nullable: false,
  })
  description: string;
}
