import { Module } from '@nestjs/common';
import { BadusbController } from './badusb.controller';
import { BadusbService } from './badusb.service';

@Module({
  controllers: [BadusbController],
  providers: [BadusbService],
})
export class BadusbModule {}
