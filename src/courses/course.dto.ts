import { IsNotEmpty } from 'class-validator';

export class CourseDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;
}
