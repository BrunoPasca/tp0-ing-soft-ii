import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateSnapDto } from './dto/create-snap.dto';
import { Snap } from './entities/snap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { isUUID } from 'class-validator';

@Injectable()
export class SnapsService {
  private readonly logger = new Logger (SnapsService.name);
  constructor(
    @InjectRepository(Snap) private snapRepository: Repository<Snap>,
  ) {}

  async create(createSnapDto: CreateSnapDto) {
    this.logger.log('Creating a new snap');
    if (createSnapDto.message && createSnapDto.message.length > 280) {
      throw new BadRequestException({
        type: 'https://example.com/errors/bad-request-error',
        title: 'Snap message too long',
        status: 400,
        detail: 'The snap message can not exceed 280 characters.',
        message: `${createSnapDto.message}`
      });
    }
    const snap = await this.snapRepository.create(createSnapDto);
    const savedSnap = await this.snapRepository.save(snap);
    this.logger.log('Snap created successfully');
    return { data: savedSnap };
  }

  async findAll() {
    this.logger.log('Fetching all snaps');
    const snaps = await this.snapRepository.find();
    this.logger.log('Fetched all snaps successfully');
    return { data: snaps };
  }

  async findOne(id: UUID) {
    this.logger.log(`Fetching snap with ID ${id}`);
    if (!isUUID(id)) {
      this.logger.warn('Invalid UUID');
      throw new BadRequestException('Invalid UUID');
    }
    const snap = await this.snapRepository.findOne({ where: { id: id } });
    if (!snap) {
      this.logger.warn(`Snap with ID ${id} not found`);
      throw new NotFoundException({
        type: 'https://example.com/errors/snap-not-found',
        title: 'Snap Not Found',
        status: 404,
        detail: `The snap with ID ${id} was not found.`,
        instance: `/snaps/${id}`
      });
    }
    this.logger.log(`Snap with ID ${id} fetched successfully`);
    return { data: snap };
  }

  async remove(id: UUID) {
    this.logger.log(`Removing snap with ID ${id}`);

    const snap = await this.snapRepository.findOne({ where: { id: id } });
    if (!snap) {
      this.logger.warn(`Snap with ID ${id} not found`);
      throw new NotFoundException({
        type: 'https://example.com/errors/snap-not-found',
        title: 'Snap Not Found',
        status: 404,
        detail: `The snap with ID ${id} was not found.`,
        instance: `/snaps/${id}`
      });
    }
    await this.snapRepository.remove(snap);
    this.logger.log(`Snap with ID ${id} removed successfully`);
    return 'Snap deleted successfully';
  }
}
