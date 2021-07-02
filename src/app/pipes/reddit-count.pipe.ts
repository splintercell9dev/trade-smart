import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redditCount'
})
export class RedditCountPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 0){
      return '' ;
    }
    else if (value < 1000){
      return value.toString() ;
    }
    else{
      return `${(value/1000).toPrecision(2)}k` ;
    }
  }

}
