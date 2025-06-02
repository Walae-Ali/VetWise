import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './TokenGeneration.Controller';

@Module({

  controllers: [ChatController],
  providers: [],
})
export class ChatModule {}