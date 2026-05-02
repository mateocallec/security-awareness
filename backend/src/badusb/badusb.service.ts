import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BadusbService {
  constructor(private readonly prisma: PrismaService) {}

  async hit(sub: string): Promise<void> {
    const badusb = await this.prisma.badUSB.findUnique({ where: { sub } });
    if (!badusb) {
      throw new NotFoundException(`BadUSB '${sub}' not found`);
    }
    await this.prisma.badUSB.update({
      where: { sub },
      data: { status: 1 },
    });
  }
}
