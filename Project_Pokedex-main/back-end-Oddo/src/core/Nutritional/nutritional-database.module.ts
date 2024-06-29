import { Module } from '@nestjs/common';
import { NutritionalDatabaseController } from './nutritional-database.controller';
import { NutritionalDatabaseService } from './nutritional-database.service';
;

@Module({
  controllers: [NutritionalDatabaseController],
  providers: [NutritionalDatabaseService],
})
export class NutritionalDatabaseModule {}
