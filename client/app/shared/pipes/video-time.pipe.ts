import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatVideoTime',
})
export class VideoTimePipe implements PipeTransform {
  transform(timestamp: number): string {
    if (!timestamp) return '0:00:00';
    else {
      let hours = Math.floor(timestamp / 60 / 60);
      let minutes = Math.floor(timestamp / 60) - hours * 60;
      let seconds = timestamp % 60;
      // format = M:SS:mm (Minute:Second:millisecond)
      // converts each number to a string; pads 0's to maintain format
      return (
        minutes.toString().padStart(1, '0') +
        ':' +
        seconds.toString().split('.')[0].padStart(2, '0') +
        ':' +
        seconds.toFixed(2).split('.')[1]
      );
    }
  }
}
