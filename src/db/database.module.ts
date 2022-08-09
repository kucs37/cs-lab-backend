/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Database } from './database.provider';

@Module({
  providers: [...Database],
  exports: [...Database],
})
export class DatabaseModule {}
