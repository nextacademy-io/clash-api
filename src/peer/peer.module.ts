import { Module } from '@nestjs/common';
import { PeerService } from './peer.service';
import { PeerResolver } from './peer.resolver';

@Module({
  providers: [PeerResolver, PeerService],
})
export class PeerModule {}
