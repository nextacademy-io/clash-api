import { InputType, Field } from '@nestjs/graphql';
import { Gender } from '../entities/gender.enum';

@InputType()
export class CreatePeerInput {
  @Field(() => String, { description: 'The full name of the peer' })
  name: string;

  @Field(() => Gender, { description: 'The gender of the peer' })
  gender: Gender;

  @Field(() => String, { description: 'The city of the peer' })
  city: string;

  @Field(() => String, { description: 'The country of the peer' })
  country: string;

  @Field(() => String, { description: 'The picture URL of the peer' })
  pictureUrl: string;
}
