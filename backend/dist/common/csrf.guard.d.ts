import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class CsrfGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
