import { Controller, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './create-questionnaire.dto';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post(':sub')
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('sub') sub: string, @Body() dto: CreateQuestionnaireDto) {
    const result = await this.questionnaireService.create(sub, dto);
    return { status: true, ...result };
  }
}
