import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {
    if (value == null) {
      return 'N/A';
    }

    let minutes: number;

    if (typeof value === 'string') {
      minutes = parseInt(value, 10);
      if (isNaN(minutes)) {
        return 'N/A';
      }
    } else {
      minutes = value;
    }

    if (minutes <= 0) {
      return 'N/A';
    }

    // Calculate days, hours, minutes
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins = minutes % 60;

    let result = '';
    if (days > 0) {
      result += days + (days === 1 ? ' day ' : ' days ');
    }
    if (hours > 0) {
      result += hours + (hours === 1 ? ' hour ' : ' hours ');
    }
    if (mins > 0) {
      result += mins + (mins === 1 ? ' minute' : ' minutes');
    }
    return result.trim();
  }
}
