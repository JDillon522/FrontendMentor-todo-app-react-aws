import { AppService } from './app.service';
import { ClientAppService } from './services/client-app/client-app.service';
export declare class AppController {
    private readonly appService;
    private readonly clientService;
    constructor(appService: AppService, clientService: ClientAppService);
    getHello(): string;
    getApp(params: any): Promise<unknown>;
}
