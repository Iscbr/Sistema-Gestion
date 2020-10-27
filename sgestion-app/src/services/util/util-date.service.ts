import { Injectable } from "@angular/core";

import * as moment from 'moment';

@Injectable({
  providedIn: "root"
})
export class UtilDateService {

  constructor() {
  }

  private months: string[] =
    [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

  public parseDate(dateAsString: string) {
    const date = new Date(dateAsString);
    let dateString = moment(date).locale('es').format('L');
    dateString = dateString.charAt(0).toUpperCase() + dateString.substring(1);
    const dateSplitted = dateString.split("/");
    const monthName = this.months[date.getUTCMonth()];
    dateString = dateSplitted[0] + "/" + monthName + "/" + dateSplitted[2];
    return dateString;
  }
}
