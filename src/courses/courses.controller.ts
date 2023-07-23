import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDto } from './course.dto';
import { Response } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.service.findAll();
    res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) courseId: number,
    @Res() res: Response,
  ) {
    const result = await this.service.findOne(courseId);
    res.status(HttpStatus.OK).json(result);
  }

  @Post()
  async create(@Body() course: CourseDto, @Res() res: Response) {
    const result = await this.service.create(course);
    res.location(`/courses/${result.id}`).sendStatus(HttpStatus.CREATED);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) courseId: number,
    @Res() res: Response,
  ) {
    await this.service.remove(courseId);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
