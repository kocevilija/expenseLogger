import { TestBed } from '@angular/core/testing';
import { Data } from '@angular/router';
import { Expense } from 'src/app/interfaces/expense';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add all expenses', () => 
  {
    let expected = 10;
    let expenses: Expense[] = [
      {
        amount: 5, 
        type: 'Games',
        createdOn: new Date(),
        description: 'Description'
      },
      {
        amount: 5, 
        type: 'Service',
        createdOn: new Date(),
        description: 'Description'
      }
    ];
    var service: DataService = TestBed.inject(DataService);
    var total = service.calculateCurrentTotal(expenses);
    expect(expected).toEqual(total);
  });
});
