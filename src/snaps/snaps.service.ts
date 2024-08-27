import { Injectable } from '@nestjs/common';
import { CreateSnapDto } from './dto/create-snap.dto';

@Injectable()
export class SnapsService {
  create(createSnapDto: CreateSnapDto) {
    return 'This action adds a new snap';
  }

  findAll() {
    return `This action returns all snaps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} snap`;
  }

  remove(id: number) {
    return `This action removes a #${id} snap`;
  }
}
