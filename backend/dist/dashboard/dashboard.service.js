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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const encryption_service_1 = require("../common/encryption.service");
const generate_sub_1 = require("../common/generate-sub");
let DashboardService = class DashboardService {
    constructor(prisma, encryption) {
        this.prisma = prisma;
        this.encryption = encryption;
    }
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
    async createBadusb(dto) {
        let sub;
        do {
            sub = (0, generate_sub_1.generateSub)(8);
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
    async deleteBadusb(sub) {
        const badusb = await this.prisma.badUSB.findUnique({ where: { sub } });
        if (!badusb) {
            throw new common_1.NotFoundException(`BadUSB '${sub}' not found`);
        }
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
    async deleteQuestionnaire(sub) {
        const q = await this.prisma.questionnaire.findUnique({ where: { sub } });
        if (!q) {
            throw new common_1.NotFoundException(`Questionnaire '${sub}' not found`);
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        encryption_service_1.EncryptionService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map