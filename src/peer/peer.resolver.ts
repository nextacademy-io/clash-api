import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PeerService } from './peer.service';
import { Peer } from './entities/peer.entity';
import { CreatePeerInput } from './dto/create-peer.input';
import { UpdatePeerInput } from './dto/update-peer.input';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Resolver(() => Peer)
export class PeerResolver {
  constructor(
    private readonly peerService: PeerService,
    @InjectEntityManager() private readonly entityManager: EntityManager, // Inject EntityManager
  ) {}

  @Mutation(() => Peer)
  async createPeer(@Args('createPeerInput') createPeerInput: CreatePeerInput) {
    return await this.peerService.create(this.entityManager, createPeerInput);
  }

  @Query(() => [Peer], { name: 'peers' }) // Query for finding all peers
  async findPeers(): Promise<Peer[]> {
    return await this.peerService.findAll(this.entityManager);
  }

  @Query(() => Peer, { name: 'peer' }) // Query for finding a single peer by ID
  async findOnePeer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Peer | null> {
    return await this.peerService.findOne(this.entityManager, id);
  }

  @Mutation(() => Peer)
  async updatePeer(@Args('updatePeerInput') updatePeerInput: UpdatePeerInput) {
    return await this.peerService.update(
      this.entityManager,
      updatePeerInput.id,
      updatePeerInput,
    );
  }

  @Mutation(() => Boolean)
  async removePeer(@Args('id', { type: () => Int }) id: number) {
    return await this.peerService.remove(this.entityManager, id);
  }
}
