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
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CourseDto } from './dtos/course.dto';
import { Response } from 'express';
import { Course } from './entities/course..entity';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Find All Courses' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'List of All Courses',
    type: [Course],
  })
  async findAll(@Res() res: Response) {
    const result = await this.service.findAll();
    res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One Course' })
  @ApiOkResponse({ description: 'One Course', type: Course })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findOne(
    @Param('id', ParseIntPipe) courseId: number,
    @Res() res: Response,
  ) {
    const result = await this.service.findOne(courseId);
    res.status(HttpStatus.OK).json(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create a Course' })
  @ApiCreatedResponse({ description: 'Created a Course' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() course: CourseDto, @Res() res: Response) {
    const result = await this.service.create(course);
    res.location(`/courses/${result.id}`).sendStatus(HttpStatus.CREATED);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a Course' })
  @ApiNoContentResponse({ description: 'Removed a Course' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async remove(
    @Param('id', ParseIntPipe) courseId: number,
    @Res() res: Response,
  ) {
    await this.service.remove(courseId);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
