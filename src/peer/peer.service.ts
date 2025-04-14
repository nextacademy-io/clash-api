import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreatePeerInput } from './dto/create-peer.input';
import { UpdatePeerInput } from './dto/update-peer.input';
import { Peer } from './entities/peer.entity';

@Injectable()
export class PeerService {
  async create(
    entityManager: EntityManager,
    createPeerInput: CreatePeerInput,
  ): Promise<Peer> {
    const peer = entityManager.create(Peer, createPeerInput);
    return await entityManager.save(Peer, peer);
  }

  async findAll(entityManager: EntityManager): Promise<Peer[]> {
    return await entityManager.find(Peer, {
      relations: ['clashes'], // Ensure clashes relationship is loaded
    });
  }

  async findOne(
    entityManager: EntityManager,
    id: number,
  ): Promise<Peer | null> {
    return await entityManager.findOne(Peer, {
      where: { id },
      relations: ['clashes'],
    });
  }

  async update(
    entityManager: EntityManager,
    id: number,
    updatePeerInput: UpdatePeerInput,
  ): Promise<Peer> {
    const peer = await entityManager.findOne(Peer, { where: { id } });
    if (!peer) {
      throw new Error(`Peer with ID ${id} not found`);
    }
    const updatedPeer = entityManager.merge(Peer, peer, updatePeerInput);
    return await entityManager.save(Peer, updatedPeer);
  }

  async remove(entityManager: EntityManager, id: number): Promise<boolean> {
    const result = await entityManager.delete(Peer, id);
    return (result.affected ?? 0) > 0;
  }
}
