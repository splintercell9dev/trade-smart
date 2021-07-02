import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tweetMetrics'
})
export class TweetMetricsPipe implements PipeTransform {

  transform(value: number): string | number {
    if (value){
      return value ;
    }
    else{
      return '' ;
    }
  }

}
