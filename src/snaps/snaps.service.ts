import { Injectable } from '@nestjs/common';
import { CreateSnapDto } from './dto/create-snap.dto';
import { Snap } from './entities/snap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class SnapsService {
  constructor(
    @InjectRepository(Snap) private snapRepository: Repository<Snap>,
  ) {}

  async create(createSnapDto: CreateSnapDto) {
    const snap = this.snapRepository.create(createSnapDto);
    return this.snapRepository.save(snap);
  }

  findAll() {
    return this.snapRepository.find();
  }

  findOne(id: UUID) {
    return this.snapRepository.findOne({ where: { id: id } });
  }

  async remove(id: UUID) {
    const snap = await this.findOne(id);
    return this.snapRepository.remove(snap);
  }
}
