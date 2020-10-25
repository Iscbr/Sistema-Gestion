import { CurrencyPipe } from '@angular/common';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilCurrencyService {

  constructor(
    private currencyPipe: CurrencyPipe
  ) { }

  /**
   * Recibe un valor numérico y lo devuelve en formato de moneda (MXN) a dos decimales.
   * Ej.
   *  1000 -> $1,000.00 MXN
   * @param value número a convertir en formato de moneda
   */
  public formatAmountToCurrencyString(value: number) {
    let numberFormat = this.currencyPipe.transform(value, "MXN", 'symbol-narrow', '1.2-2');
    numberFormat += " MXN";
    return numberFormat;
  }

  /**
   * Recibe una cantidad en cualquier formato y devuelve el valor numérico.
   * Ej.
   *  $1,000.00 MXN -> 1000
   *  1,000 -> 1000
   *  $1000 -> 1000
   *  $1000 MXN -> 1000
   *  1000 MXN -> 1000
   *  fsd#$%gsgr -> 0 (Si no existe ningún número en la cadean por defecto será 0)
   *  sdfsdf$50erfe -> 50 (Si existe un número entre caracteres se toma ese número)
   * @param currency valor de tipo string a convertir
   */
  public getNumberFromCurrencyString(currency: string) {
    if (currency.includes(".")) {
      const currencySplitted = currency.split(".");
      return parseFloat(
        currencySplitted[0].replace(/\D/g, '') +
        "." +
        currencySplitted[1].replace(/\D/g, '')
      );
    }
    return parseFloat(currency.replace(/\D/g, '') !== "" ?
      currency.replace(/\D/g, '') : "0"
    );
  }
  
}
