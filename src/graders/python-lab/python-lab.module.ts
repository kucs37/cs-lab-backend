import { Module } from '@nestjs/common';
import { PythonLabService } from './python-lab.service';
import { PythonLabController } from './python-lab.controller';

@Module({
  controllers: [PythonLabController],
  providers: [PythonLabService]
})
export class PythonLabModule {}
