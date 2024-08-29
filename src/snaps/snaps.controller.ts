import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnapsService } from './snaps.service';
import { CreateSnapDto } from './dto/create-snap.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('snaps')
export class SnapsController {
  constructor(private readonly snapsService: SnapsService) {}

  @Post()
  create(@Body() createSnapDto: CreateSnapDto) {
    return this.snapsService.create(createSnapDto);
  }

  @Get()
  findAll() {
    return this.snapsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.snapsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.snapsService.remove(id);
  }
}
