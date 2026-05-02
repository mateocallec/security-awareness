import { BadusbService } from './badusb.service';
export declare class BadusbController {
    private readonly badusbService;
    constructor(badusbService: BadusbService);
    hit(sub: string): Promise<{
        status: boolean;
    }>;
}
