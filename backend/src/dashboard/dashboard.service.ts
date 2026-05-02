import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../common/encryption.service';
import { CreateBadusbDto } from './create-badusb.dto';
import { generateSub } from '../common/generate-sub';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService,
  ) {}

  async getBadusbList() {
    const list = await this.prisma.badUSB.findMany({
      select: { sub: true, name: true, dropLocation: true, status: true },
    });

    return {
      status: true,
      badusb_list: list.map((b) => ({
        sub: b.sub,
        name: b.name,
        drop_location: b.dropLocation,
        status: b.status,
      })),
    };
  }

  async createBadusb(dto: CreateBadusbDto) {
    let sub: string;
    do {
      sub = generateSub(8);
    } while (await this.prisma.badUSB.findUnique({ where: { sub } }));

    const badusb = await this.prisma.badUSB.create({
      data: {
        sub,
        name: dto.name,
        dropLocation: dto.drop_location ?? null,
        status: 0,
      },
    });

    return {
      sub: badusb.sub,
      name: badusb.name,
      drop_location: badusb.dropLocation,
      status: badusb.status,
    };
  }

  async deleteBadusb(sub: string): Promise<void> {
    const badusb = await this.prisma.badUSB.findUnique({ where: { sub } });
    if (!badusb) {
      throw new NotFoundException(`BadUSB '${sub}' not found`);
    }
    // Related questionnaires are removed by the DB cascade (onDelete: Cascade)
    await this.prisma.badUSB.delete({ where: { sub } });
  }

  async getQuestionnaireList() {
    const list = await this.prisma.questionnaire.findMany({
      include: { badusb: true },
    });

    return {
      status: true,
      questionnaire_list: list.map((q) => ({
        sub: q.sub,
        badusb_sub: q.badusb.sub,
        email: q.email ? this.encryption.decrypt(q.email) : null,
        location_found: q.locationFound,
        insertion_reason: q.insertionReason,
        comfort_rating: q.comfortRating,
        malicious: q.malicious,
      })),
    };
  }

  async deleteQuestionnaire(sub: string): Promise<void> {
    const q = await this.prisma.questionnaire.findUnique({ where: { sub } });
    if (!q) {
      throw new NotFoundException(`Questionnaire '${sub}' not found`);
    }
    await this.prisma.questionnaire.delete({ where: { sub } });
  }

  async getStats() {
    const [total, plugged, answers] = await Promise.all([
      this.prisma.badUSB.count(),
      this.prisma.badUSB.count({ where: { status: 1 } }),
      this.prisma.questionnaire.count(),
    ]);

    return {
      status: true,
      badusb_total: total,
      badusb_plugged: plugged,
      questionnaire_answers: answers,
    };
  }
}
