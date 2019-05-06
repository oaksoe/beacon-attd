import { Injectable } from '@angular/core';
import { Modules } from '../../models';

@Injectable()
export class ModuleService {
    public getModules(): string[] {
        return Modules; 
    }
}
