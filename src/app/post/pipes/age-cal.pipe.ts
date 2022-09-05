import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageCal'
})
export class AgeCalPipe implements PipeTransform {

  transform(value:any): any {
    let currentYear:any = new Date().getFullYear();
    let userBirthYear:any = new Date(value).getFullYear();
    let userage = currentYear-userBirthYear
    return userage;
  }

}
