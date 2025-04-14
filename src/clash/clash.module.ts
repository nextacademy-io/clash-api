import { Module } from '@nestjs/common';
import { ClashService } from './clash.service';
import { ClashResolver } from './clash.resolver';

@Module({
  providers: [ClashResolver, ClashService],
})
export class ClashModule {}
