"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const encryption_service_1 = require("../common/encryption.service");
const generate_sub_1 = require("../common/generate-sub");
let QuestionnaireService = class QuestionnaireService {
    constructor(prisma, encryption) {
        this.prisma = prisma;
        this.encryption = encryption;
    }
    async create(badusbSub, dto) {
        const badusb = await this.prisma.badUSB.findUnique({ where: { sub: badusbSub } });
        if (!badusb) {
            throw new common_1.NotFoundException(`BadUSB '${badusbSub}' not found`);
        }
        let sub;
        do {
            sub = (0, generate_sub_1.generateSub)(16);
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
};
exports.QuestionnaireService = QuestionnaireService;
exports.QuestionnaireService = QuestionnaireService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        encryption_service_1.EncryptionService])
], QuestionnaireService);
//# sourceMappingURL=questionnaire.service.js.map