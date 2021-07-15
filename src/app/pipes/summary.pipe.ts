import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: null | undefined | '' | string): any | string {
    if (value === null || value === undefined || value === ''){
      return '-' ;
    }
    else{
      return value ;
    }
  }

}
