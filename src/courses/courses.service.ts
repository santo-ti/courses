import { Injectable, NotFoundException } from '@nestjs/common';
import { COURSES } from './courses.mock';
import { CourseDto } from './dtos/course.dto';
import { Course } from './entities/course..entity';

@Injectable()
export class CoursesService {
  private readonly courses: Course[] = COURSES;

  findAll(): Promise<Course[]> {
    return new Promise<Course[]>((resolve, reject) => {
      try {
        resolve(this.courses);
      } catch (err) {
        reject(err);
      }
    });
  }

  findOne(courseId: number): Promise<Course> {
    return new Promise<Course>((resolve, reject) => {
      try {
        const result: Course = this.courses.find(
          (course) => course.id === courseId,
        );

        if (!result) {
          throw new NotFoundException('Course not found');
        }

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  create(course: CourseDto): Promise<Course> {
    return new Promise<Course>((resolve, reject) => {
      try {
        const newCourse = {
          id: this.courses.length + 1,
          title: course.title,
          description: course.description,
        };
        this.courses.push(newCourse);
        resolve(newCourse);
      } catch (err) {
        reject(err);
      }
    });
  }

  remove(courseId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const index = this.courses.findIndex(
          (course) => course.id === courseId,
        );

        if (index === -1) {
          throw new NotFoundException('Course not found');
        }

        this.courses.splice(index, 1);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
