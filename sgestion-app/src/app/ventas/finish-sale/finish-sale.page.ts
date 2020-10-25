import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-finish-sale',
  templateUrl: './finish-sale.page.html',
  styleUrls: ['./finish-sale.page.scss'],
})
export class FinishSalePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  private loadingElement: HTMLIonLoadingElement;

  ngOnInit() {
  }

  public async verifyPayment(amount: string) {
    if (amount.includes('-')) {

    }
    const amountAsNumber = FinishSalePage.getNumberFromString(amount);
    if (amount )
      console.log("Cantidad: ", amount);
  }

  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal() {
    await this.modalController.dismiss(null, "Closed");
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
  private static async getNumberFromString(currency: string) {
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

  /**
   * Se muestra un cuadro de diálogo con un título, un mensaje y botones, todos pasados como parámetro. Dando la posibilidad
   * de permitir al usuario cerrarlo dando click en cualquier parte de la pantalla para cerrarlo o no.
   * @param backdropDismiss bandera que indica si se puede cerrar el cuadro de diálogo dando click fuera de este o no
   * @param header titulo a mostrar en el cuadro de diálogo
   * @param message mensaje a mostarr en el cuadro de diálogo
   * @param buttons botones a mostar en el cuadro de diálogo con sus respectivos handlers o sin estos
   */
  private async showMessageAlert(backdropDismiss: boolean, header: string, message: string, buttons: any) {
    await this.dismissLoadingAlert();
    this.alertController
      .create({
        backdropDismiss: backdropDismiss,
        header: header,
        message: message,
        buttons: buttons
      })
      .then(alertCreated => alertCreated.present());
  }

  /**
   * Se oculta el popup mostrado en pantalla.
   */
  private async dismissLoadingAlert() {
    await this.loadingElement.dismiss();
  }

  /**
   * Se muestra un popup con una animación y el mensaje pasado como parámetro
   * @param message mensaje a mostar en el popup.
   */
  private async showLoadingAlert(message: string) {
    this.loadingElement = await this.loadingController
      .create({
        backdropDismiss: false,
        message: message,
        spinner: 'bubbles'
      });
    await this.loadingElement.present();
  }

}
