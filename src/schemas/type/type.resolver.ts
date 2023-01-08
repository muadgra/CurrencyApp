import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { TypeModel } from './TypeModel';
import { TypeService } from './type.service';
import { AddTypeDTO } from './DTOs/addTypeDTO';
@Resolver(() => TypeModel)
export class TypeResolver {
  constructor(
    @Inject(TypeService) private typeService: TypeService,
  ) { }
  @Query(() => TypeModel)
  async customer(@Args('code') code: number): Promise<TypeModel> {
    return await this.typeService.findOne(code);
  }
  @Query(() => [TypeModel])
  async types(): Promise<TypeModel[]> {
    return await this.typeService.findAll();
  }
  @Mutation(() => TypeModel)
  async addModel(
    @Args('dto') dto: AddTypeDTO
  ) {
    this.typeService.addType(dto);
  }
}