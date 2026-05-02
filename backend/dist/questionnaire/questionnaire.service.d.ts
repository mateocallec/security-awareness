import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../common/encryption.service';
import { CreateQuestionnaireDto } from './create-questionnaire.dto';
export declare class QuestionnaireService {
    private readonly prisma;
    private readonly encryption;
    constructor(prisma: PrismaService, encryption: EncryptionService);
    create(badusbSub: string, dto: CreateQuestionnaireDto): Promise<{
        sub: string;
    }>;
}
