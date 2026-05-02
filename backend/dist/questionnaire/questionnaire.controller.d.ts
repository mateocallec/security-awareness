import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './create-questionnaire.dto';
export declare class QuestionnaireController {
    private readonly questionnaireService;
    constructor(questionnaireService: QuestionnaireService);
    create(sub: string, dto: CreateQuestionnaireDto): Promise<{
        sub: string;
        status: boolean;
    }>;
}
