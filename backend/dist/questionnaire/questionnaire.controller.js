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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireController = void 0;
const common_1 = require("@nestjs/common");
const questionnaire_service_1 = require("./questionnaire.service");
const create_questionnaire_dto_1 = require("./create-questionnaire.dto");
let QuestionnaireController = class QuestionnaireController {
    constructor(questionnaireService) {
        this.questionnaireService = questionnaireService;
    }
    async create(sub, dto) {
        const result = await this.questionnaireService.create(sub, dto);
        return { status: true, ...result };
    }
};
exports.QuestionnaireController = QuestionnaireController;
__decorate([
    (0, common_1.Post)(':sub'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_questionnaire_dto_1.CreateQuestionnaireDto]),
    __metadata("design:returntype", Promise)
], QuestionnaireController.prototype, "create", null);
exports.QuestionnaireController = QuestionnaireController = __decorate([
    (0, common_1.Controller)('questionnaire'),
    __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService])
], QuestionnaireController);
//# sourceMappingURL=questionnaire.controller.js.map