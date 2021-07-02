import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment' ;

@Pipe({
  name: 'tweetTime'
})
export class TweetTimePipe implements PipeTransform {

  transform(value: Date): string {
    const createdAt = moment(value) ;
    const dayDiff = moment().diff(createdAt, 'days') ;
    const hourDiff = moment().diff(createdAt, 'hours') ;
    const minDiff = moment().diff(createdAt, 'minutes') ;

    if (dayDiff){
      return `${dayDiff}d` ;
    }
    else if (hourDiff){
      return `${hourDiff}h` ;
    }
    else{
      return `${minDiff}m` ;
    }
  }

}
