import { Controller } from '@nestjs/common';
import { PythonLabService } from './python-lab.service';

@Controller('python-lab')
export class PythonLabController {
  constructor(private readonly pythonLabService: PythonLabService) {}
}
