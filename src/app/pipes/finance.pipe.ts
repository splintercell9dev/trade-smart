import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finance'
})
export class FinancePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (value === null || value === undefined || value === ''){
      return '-' ;
    }
    else{
      return value ;
    }
  }

}
