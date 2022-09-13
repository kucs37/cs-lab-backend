import { Injectable } from '@nestjs/common';
import { CreateLabInput } from './dto/create-lab.input';
import { UpdateLabInput } from './dto/update-lab.input';

@Injectable()
export class LabService {
  create(createLabInput: CreateLabInput) {
    return 'This action adds a new lab';
  }

  findAll() {
    return `This action returns all lab`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lab`;
  }

  update(id: number, updateLabInput: UpdateLabInput) {
    return `This action updates a #${id} lab`;
  }

  remove(id: number) {
    return `This action removes a #${id} lab`;
  }
}
