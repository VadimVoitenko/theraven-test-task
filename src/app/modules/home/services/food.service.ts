import { Injectable } from '@angular/core';
import { IFood } from '../../../shared/interfaces/IFood';
import { sample_foods } from '../../../../data';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): IFood[] {
    return sample_foods;
  }
}
