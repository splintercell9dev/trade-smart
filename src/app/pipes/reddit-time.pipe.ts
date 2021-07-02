import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment' ;

@Pipe({
  name: 'redditTime'
})
export class RedditTimePipe implements PipeTransform {

  transform(value: number): string {
    const createdAt = moment(value * 1000) ;
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
