import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../common/encryption.service';
import { CreateQuestionnaireDto } from './create-questionnaire.dto';
import { generateSub } from '../common/generate-sub';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService,
  ) {}

  async create(badusbSub: string, dto: CreateQuestionnaireDto) {
    const badusb = await this.prisma.badUSB.findUnique({ where: { sub: badusbSub } });
    if (!badusb) {
      throw new NotFoundException(`BadUSB '${badusbSub}' not found`);
    }

    let sub: string;
    do {
      sub = generateSub(16);
    } while (await this.prisma.questionnaire.findUnique({ where: { sub } }));

    const emailEncrypted = dto.email ? this.encryption.encrypt(dto.email) : null;

    await this.prisma.questionnaire.create({
      data: {
        sub,
        badusbId: badusb.id,
        email: emailEncrypted,
        locationFound: dto.location_found,
        insertionReason: dto.insertion_reason,
        comfortRating: dto.comfort_rating,
        malicious: dto.malicious,
      },
    });

    return { sub };
  }
}
