import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnapsModule } from './../src/snaps/snaps.module';
import { Snap } from './../src/snaps/entities/snap.entity'; // Adjust the import path as necessary

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Snap],
      synchronize: true,
    }),
    SnapsModule,
  ],
})
export class TestAppModule {}