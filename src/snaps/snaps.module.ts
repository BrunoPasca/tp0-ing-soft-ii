import { Module } from '@nestjs/common';
import { SnapsService } from './snaps.service';
import { SnapsController } from './snaps.controller';

@Module({
  controllers: [SnapsController],
  providers: [SnapsService],
})
export class SnapsModule {}
