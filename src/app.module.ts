import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnapsModule } from './snaps/snaps.module';

@Module({
  imports: [SnapsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
