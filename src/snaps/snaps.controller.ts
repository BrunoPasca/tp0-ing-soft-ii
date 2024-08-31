import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SnapsService } from './snaps.service';
import { CreateSnapDto } from './dto/create-snap.dto';
import { ResponseSnapDto } from './dto/response-snap.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import {
  ApiBearerAuth,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('snaps')
@ApiBearerAuth()
@Controller('snaps')
export class SnapsController {
  constructor(private readonly snapsService: SnapsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieve all snaps.',
    type: [ResponseSnapDto],
  })
  findAll() {
    return this.snapsService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateSnapDto })
  @ApiResponse({
    status: 201,
    description: 'Create a new snap.',
    type: ResponseSnapDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createSnapDto: CreateSnapDto) {
    return this.snapsService.create(createSnapDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'UUID of the snap' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a snap by ID.',
    type: ResponseSnapDto,
  })
  @ApiResponse({ status: 404, description: 'Snap not found.' })
  findOne(@Param('id') id: UUID) {
    return this.snapsService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'UUID of the snap' })
  @ApiResponse({ status: 200, description: 'Delete a snap by ID.' })
  @ApiResponse({ status: 404, description: 'Snap not found.' })
  remove(@Param('id') id: UUID) {
    return this.snapsService.remove(id);
  }
}
