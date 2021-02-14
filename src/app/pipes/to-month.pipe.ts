import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMonth'
})
export class ToMonthPipe implements PipeTransform {

  transform(value: number, ): string {

    switch (value) {
      case 1:
        return 'ene';
        break;
      case 2:
        return 'feb';
        break;
      case 3:
        return 'mar';
        break;
      case 4:
        return 'abr';
        break;
      case 5:
        return 'may';
        break;
      case 6:
        return 'jun';
        break;
      case 7:
        return 'jul';
        break;
      case 8:
        return 'ago';
        break;
      case 9:
        return 'sep';
        break;
      case 10:
        return 'oct';
        break;
      case 11:
        return 'nov';
        break;
      case 12:
        return 'dic';
        break;

      default:
        return 'ene';
        break;
    }

  }

}
