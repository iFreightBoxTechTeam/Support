import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daytime'
})
export class DaytimePipe implements PipeTransform {
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

    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins = minutes % 60;

    const parts: string[] = [];
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (mins > 0) parts.push(`${mins} minute${mins > 1 ? 's' : ''}`);

    return parts.join(' ') || '0 minutes';
  }
}
