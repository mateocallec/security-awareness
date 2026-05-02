import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../common/encryption.service';
import { CreateBadusbDto } from './create-badusb.dto';
export declare class DashboardService {
    private readonly prisma;
    private readonly encryption;
    constructor(prisma: PrismaService, encryption: EncryptionService);
    getBadusbList(): Promise<{
        status: boolean;
        badusb_list: {
            sub: string;
            name: string;
            drop_location: string;
            status: number;
        }[];
    }>;
    createBadusb(dto: CreateBadusbDto): Promise<{
        sub: string;
        name: string;
        drop_location: string;
        status: number;
    }>;
    deleteBadusb(sub: string): Promise<void>;
    getQuestionnaireList(): Promise<{
        status: boolean;
        questionnaire_list: {
            sub: string;
            badusb_sub: string;
            email: string;
            location_found: string;
            insertion_reason: number;
            comfort_rating: number;
            malicious: boolean;
        }[];
    }>;
    deleteQuestionnaire(sub: string): Promise<void>;
    getStats(): Promise<{
        status: boolean;
        badusb_total: number;
        badusb_plugged: number;
        questionnaire_answers: number;
    }>;
}
