import { AlertController, LoadingController } from '@ionic/angular';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilUiService {

  private loadingElement: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  /**
   * Se muestra un cuadro de diálogo con un título, un mensaje y botones, todos pasados como parámetro. Dando la posibilidad
   * de permitir al usuario cerrarlo dando click en cualquier parte de la pantalla para cerrarlo o no.
   * @param backdropDismiss bandera que indica si se puede cerrar el cuadro de diálogo dando click fuera de este o no
   * @param header titulo a mostrar en el cuadro de diálogo
   * @param message mensaje a mostarr en el cuadro de diálogo
   * @param buttons botones a mostar en el cuadro de diálogo con sus respectivos handlers o sin estos
   */
  public async showMessageAlert(backdropDismiss: boolean, header: string, message: string, buttons: any) {
    if (this.loadingElement !== null && this.loadingElement !== undefined) {
      await this.dismissLoadingAlert();
    }
    this.alertController
      .create({
        backdropDismiss,
        header,
        message,
        buttons
      })
      .then(alertCreated => alertCreated.present());
  }

  /**
   * Se muestra un popup con una animación y el mensaje pasado como parámetro
   * @param message mensaje a mostar en el popup.
   */
  public async showLoadingAlert(message: string) {
    this.loadingElement = await this.loadingController
      .create({
        backdropDismiss: false,
        message,
        spinner: 'bubbles'
      });
    await this.loadingElement.present();
  }

  /**
   * Se oculta el popup mostrado en pantalla.
   */
  public async dismissLoadingAlert() {
    await this.loadingElement.dismiss();
  }
}
