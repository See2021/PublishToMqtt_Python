import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwitchModule } from './switch/switch.module';

@Module({
  imports: [SwitchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}