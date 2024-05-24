import { Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { SwitchService } from './switch.service';

@Controller('switch')
export class SwitchController {
    constructor(private switchService: SwitchService) { }

    @Get('status')
    getSwitchStatus(): string {
        return this.switchService.getSwitchStatus();
    }

    @Post('status/:number')
    @HttpCode(HttpStatus.OK)
    setSwitchStatus(@Param('number') switchNumber: string): { message: string } {
        const status = parseInt(switchNumber, 10);
        if (status === 0 || status === 1) {
            this.switchService.publishSwitchStatus(status);
            return { message: `Switch is turn to: ${status === 1 ? 'On' : 'Off'}` };
        } else {
            throw new Error('Invalid status value. It should be 0 or 1.');
        }
    }
}
