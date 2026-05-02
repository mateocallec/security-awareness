import { PrismaService } from '../prisma/prisma.service';
export declare class BadusbService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    hit(sub: string): Promise<void>;
}
