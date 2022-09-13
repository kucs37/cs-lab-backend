import { Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabResolver } from './lab.resolver';

@Module({
  providers: [LabResolver, LabService]
})
export class LabModule {}
