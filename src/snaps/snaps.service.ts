import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSnapDto } from './dto/create-snap.dto';
import { Snap } from './entities/snap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { isUUID } from 'class-validator';

@Injectable()
export class SnapsService {
  constructor(
    @InjectRepository(Snap) private snapRepository: Repository<Snap>,
  ) {}

  async create(createSnapDto: CreateSnapDto) {
    const snap = await this.snapRepository.create(createSnapDto);
    return { data: await this.snapRepository.save(snap) };
  }

  async findAll() {
    return { data: await this.snapRepository.find() };
  }

  async findOne(id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const snap = await this.snapRepository.findOne({ where: { id: id } });
    if (!snap) {
      throw new NotFoundException('Snap not found');
    }
    return { data: snap };
  }

  async remove(id: UUID) {
    const snap = await this.snapRepository.findOne({ where: { id: id } });
    if (!snap) {
      throw new NotFoundException('Snap not found');
    }
    await this.snapRepository.remove(snap);
    return 'Snap deleted successfully';
  }
}
