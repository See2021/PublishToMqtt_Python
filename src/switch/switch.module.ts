import { Module } from '@nestjs/common';
import { SwitchController } from './switch.controller';
import { SwitchService } from './switch.service';

@Module({
  controllers: [SwitchController],
  providers: [SwitchService]
})
export class SwitchModule {}
