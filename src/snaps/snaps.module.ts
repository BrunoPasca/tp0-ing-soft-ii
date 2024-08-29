import { Module } from '@nestjs/common';
import { SnapsService } from './snaps.service';
import { SnapsController } from './snaps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snap } from './entities/snap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snap])],
  controllers: [SnapsController],
  providers: [SnapsService],
  exports: [SnapsService],
})
export class SnapsModule {}
