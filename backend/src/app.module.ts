import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { BadusbModule } from './badusb/badusb.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CommonModule,
    AuthModule,
    BadusbModule,
    QuestionnaireModule,
    DashboardModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
