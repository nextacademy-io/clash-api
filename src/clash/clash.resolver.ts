import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ClashService } from './clash.service';
import { Clash } from './entities/clash.entity';
import { CreateClashInput } from './dto/create-clash.input';
import { UpdateClashInput } from './dto/update-clash.input';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Resolver(() => Clash)
export class ClashResolver {
  constructor(
    private readonly clashService: ClashService,
    @InjectEntityManager() private readonly entityManager: EntityManager, // Inject EntityManager
  ) {}

  @Mutation(() => Clash)
  async createClash(
    @Args('createClashInput') createClashInput: CreateClashInput,
  ) {
    return await this.clashService.create(this.entityManager, createClashInput);
  }

  @Query(() => [Clash], { name: 'clashes' }) // Query for finding all clashes
  async findClashes(): Promise<Clash[]> {
    return await this.clashService.findAll(this.entityManager);
  }

  @Query(() => Clash, { name: 'clash' }) // Query for finding a single clash by ID
  async findOneClash(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Clash | null> {
    return await this.clashService.findOne(this.entityManager, id);
  }

  @Mutation(() => Clash)
  async updateClash(
    @Args('updateClashInput') updateClashInput: UpdateClashInput,
  ) {
    return await this.clashService.update(
      this.entityManager,
      updateClashInput.id,
      updateClashInput,
    );
  }

  @Mutation(() => Boolean)
  async removeClash(@Args('id', { type: () => Int }) id: number) {
    return await this.clashService.remove(this.entityManager, id);
  }
}
