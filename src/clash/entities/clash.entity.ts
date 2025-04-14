import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Peer } from 'src/peer/entities/peer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType({ description: 'The Clash' })
@Entity('clash')
export class Clash {
  @Field(() => ID, { description: 'The id of the clash' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Peer, { description: 'The peer that created the clash' })
  @ManyToOne(() => Peer, { nullable: false, lazy: true }) // Lazy relation
  @JoinColumn({ name: 'createdByPeerId' }) // Optional: Custom column name
  createdByPeer: Promise<Peer>; // Use Promise for lazy loading

  @Field(() => String, { description: 'The title of the clash' })
  @Column()
  title: string;

  @Field(() => String, { description: 'The description of the clash' })
  @Column()
  description: string;

  @Field(() => Date, { description: 'The date of the clash' })
  @Column({ type: 'datetime' })
  date: Date;

  @Field(() => String, { description: 'The location of the clash' })
  @Column()
  location: string;

  @Field(() => String, { description: 'The address of the clash' })
  @Column()
  address: string;

  @Field(() => [Peer], { description: 'The participants of the clash' })
  @ManyToMany(() => Peer, (peer) => peer.clashes, { lazy: true }) // Lazy relation
  @JoinTable({ name: 'clash_participants' }) // Creates a join table to manage the relationship
  participants: Promise<Peer[]>; // Use Promise for lazy loading

  @Field(() => String, { description: 'The picture url of the clash' })
  @Column()
  pictureUrl: string;
}
