import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateClashInput } from './dto/create-clash.input';
import { UpdateClashInput } from './dto/update-clash.input';
import { Clash } from './entities/clash.entity';
import { Peer } from '../peer/entities/peer.entity';

@Injectable()
export class ClashService {
  async create(
    entityManager: EntityManager,
    createClashInput: CreateClashInput,
  ): Promise<Clash> {
    const { createdByPeerId, participantIds, ...clashData } = createClashInput;

    // Find the peer who created the clash
    const createdByPeer = await entityManager.findOne(Peer, {
      where: { id: createdByPeerId },
    });
    if (!createdByPeer) {
      throw new Error(`Peer with ID ${createdByPeerId} not found`);
    }

    // Find participants
    const participants = await entityManager.findByIds(Peer, participantIds);

    // Create the clash
    const clash = entityManager.create(Clash, {
      ...clashData,
      createdByPeer: Promise.resolve(createdByPeer),
      participants: Promise.resolve(participants),
    });
    return await entityManager.save(Clash, clash);
  }

  async findAll(entityManager: EntityManager): Promise<Clash[]> {
    // Fetch all clashes with direct relations
    const clashes = await entityManager.find(Clash, {
      relations: ['createdByPeer', 'participants'], // Load only direct relations
    });

    return clashes;
  }

  async findOne(
    entityManager: EntityManager,
    id: number,
  ): Promise<Clash | null> {
    // Fetch the clash with direct relations
    const clash = await entityManager.findOne(Clash, {
      where: { id },
      relations: ['createdByPeer', 'participants'], // Load only direct relations
    });

    if (!clash) {
      return null;
    }

    return clash;
  }

  async update(
    entityManager: EntityManager,
    id: number,
    updateClashInput: UpdateClashInput,
  ): Promise<Clash> {
    const {
      createdByPeerId,
      participantIds,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id: _,
      ...clashData
    } = updateClashInput;

    // Find the existing clash
    const clash = await entityManager.findOne(Clash, {
      where: { id },
      relations: ['createdByPeer', 'participants'], // Load only direct relations
    });
    if (!clash) {
      throw new Error(`Clash with ID ${id} not found`);
    }

    // Update the creator if provided
    if (createdByPeerId) {
      const createdByPeer = await entityManager.findOne(Peer, {
        where: { id: createdByPeerId },
      });
      if (!createdByPeer) {
        throw new Error(`Peer with ID ${createdByPeerId} not found`);
      }
      clash.createdByPeer = Promise.resolve(createdByPeer);
    }

    // Update participants if provided
    if (participantIds) {
      const participants = await entityManager.findByIds(Peer, participantIds);
      clash.participants = Promise.resolve(participants);
    }

    // Merge other updates
    entityManager.merge(Clash, clash, clashData);
    return await entityManager.save(Clash, clash);
  }

  async remove(entityManager: EntityManager, id: number): Promise<boolean> {
    const result = await entityManager.delete(Clash, id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Safely resolve participants and their nested clashes.
   */
  private async resolveParticipantsWithClashes(
    entityManager: EntityManager,
    participants: Promise<Peer[]>,
  ): Promise<Peer[]> {
    const resolvedParticipants = await participants;

    // Fetch nested clashes for each participant
    const participantsWithClashes = await Promise.all(
      resolvedParticipants.map(async (participant) => {
        const participantWithClashes = await entityManager.findOne(Peer, {
          where: { id: participant.id },
          relations: ['clashes'], // Load nested clashes
        });
        return participantWithClashes!;
      }),
    );

    return participantsWithClashes;
  }
}
