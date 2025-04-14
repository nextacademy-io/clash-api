import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateClashInput {
  @Field(() => String, { description: 'The title of the clash' })
  title: string;

  @Field(() => String, { description: 'The description of the clash' })
  description: string;

  @Field(() => Date, { description: 'The date of the clash' })
  date: Date;

  @Field(() => String, { description: 'The location of the clash' })
  location: string;

  @Field(() => String, { description: 'The address of the clash' })
  address: string;

  @Field(() => ID, { description: 'The ID of the peer who created the clash' })
  createdByPeerId: number;

  @Field(() => [ID], {
    description: 'The IDs of the participants of the clash',
  })
  participantIds: number[];

  @Field(() => String, { description: 'The picture URL of the clash' })
  pictureUrl: string;
}
