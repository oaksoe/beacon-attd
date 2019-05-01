import { Injectable } from '@angular/core';
import { Intakes } from '../../models';

@Injectable()
export class IntakeService {
    public getIntakes(): string[] {
        return Intakes; 
    }
}
