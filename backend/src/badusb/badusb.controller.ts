import { Controller, Post, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { BadusbService } from './badusb.service';

@Controller('badusb-hit')
export class BadusbController {
  constructor(private readonly badusbService: BadusbService) {}

  @Post(':sub')
  @HttpCode(HttpStatus.OK)
  async hit(@Param('sub') sub: string) {
    await this.badusbService.hit(sub);
    return { status: true };
  }
}
