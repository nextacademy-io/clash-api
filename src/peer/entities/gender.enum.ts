import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

registerEnumType(Gender, {
  name: 'Gender', // Name of the enum in the GraphQL schema
  description: 'The gender of the peer', // Optional description
});
