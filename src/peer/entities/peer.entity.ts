import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Clash } from 'src/clash/entities/clash.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './gender.enum';

@ObjectType()
@Entity('peer')
export class Peer {
  @Field(() => Int, { description: 'The id of the peer' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'The full name of the peer' })
  @Column()
  name: string;

  @Field(() => Gender, { description: 'The gender of the peer' })
  @Column({ type: 'text' }) // Use TEXT instead of ENUM for SQLite
  gender: Gender;

  @Column()
  @Field(() => String, { description: 'The city of the peer. ' })
  city: string;

  @Column()
  @Field(() => String, { description: 'The country of the peer. ' })
  country: string;

  @Column()
  @Field(() => String, { description: 'The picture url of the peer. ' })
  pictureUrl: string;

  @Field(() => [Clash], { description: 'The clashes the peer participates in' })
  @ManyToMany(() => Clash, (clash) => clash.participants, { lazy: true }) // Lazy relation
  clashes: Promise<Clash[]>; // Use Promise for lazy loading
}
