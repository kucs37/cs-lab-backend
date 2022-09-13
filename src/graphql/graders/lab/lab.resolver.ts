import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LabService } from './lab.service';
import { Lab } from './entities/lab.entity';
import { CreateLabInput } from './dto/create-lab.input';
import { UpdateLabInput } from './dto/update-lab.input';

@Resolver(() => Lab)
export class LabResolver {
  constructor(private readonly labService: LabService) {}

  @Mutation(() => Lab)
  createLab(@Args('createLabInput') createLabInput: CreateLabInput) {
    return this.labService.create(createLabInput);
  }

  @Query(() => [Lab], { name: 'lab' })
  findAll() {
    return this.labService.findAll();
  }

  @Query(() => Lab, { name: 'lab' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.labService.findOne(id);
  }

  @Mutation(() => Lab)
  updateLab(@Args('updateLabInput') updateLabInput: UpdateLabInput) {
    return this.labService.update(updateLabInput.id, updateLabInput);
  }

  @Mutation(() => Lab)
  removeLab(@Args('id', { type: () => Int }) id: number) {
    return this.labService.remove(id);
  }
}
