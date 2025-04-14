import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateClashInput } from './create-clash.input';

@InputType()
export class UpdateClashInput extends PartialType(CreateClashInput) {
  @Field(() => ID, { description: 'The ID of the clash to update' })
  id: number;
}
