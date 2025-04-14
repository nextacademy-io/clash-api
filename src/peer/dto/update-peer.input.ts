import { CreatePeerInput } from './create-peer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePeerInput extends PartialType(CreatePeerInput) {
  @Field(() => Int, { description: 'The ID of the peer' })
  id: number;
}
