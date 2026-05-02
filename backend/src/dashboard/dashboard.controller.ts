import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CsrfGuard } from '../common/csrf.guard';
import { DashboardService } from './dashboard.service';
import { CreateBadusbDto } from './create-badusb.dto';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, CsrfGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('badusb')
  getBadusbList() {
    return this.dashboardService.getBadusbList();
  }

  @Post('badusb/create')
  @HttpCode(HttpStatus.CREATED)
  async createBadusb(@Body() dto: CreateBadusbDto) {
    return this.dashboardService.createBadusb(dto);
  }

  @Delete('badusb/delete/:sub')
  @HttpCode(HttpStatus.OK)
  async deleteBadusb(@Param('sub') sub: string) {
    await this.dashboardService.deleteBadusb(sub);
    return { status: true };
  }

  @Get('questionnaire')
  getQuestionnaireList() {
    return this.dashboardService.getQuestionnaireList();
  }

  @Delete('questionnaire/delete/:sub')
  @HttpCode(HttpStatus.OK)
  async deleteQuestionnaire(@Param('sub') sub: string) {
    await this.dashboardService.deleteQuestionnaire(sub);
    return { status: true };
  }

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }
}
