import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from "@ionic/angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { UtilCurrencyService } from "../../../services/util/util-currency.service";
import { SaleOrderService } from "../../../services/sale-order.service";
import { UtilUiService } from "../../../services/util/util-ui.service";

import { SaleOrder } from "../../../model/sale-order.model";

@Component({
  selector: 'app-finish-sale',
  templateUrl: './sale-finish.page.html',
  styleUrls: ['./sale-finish.page.scss'],
})
export class SaleFinishPage implements OnInit {

  constructor(
    public currencyService: UtilCurrencyService,
    private modalController: ModalController,
    private uiService: UtilUiService,
    private saleOrderService: SaleOrderService
  ) { }

  @Input() public saleOrder: SaleOrder;
  public change: number;

  public finishSaleForm: FormGroup;

  public async ngOnInit() {
    this.change = 0;
    await this.initForm();
  }

  private async initForm() {
    this.finishSaleForm = new FormGroup({
      amountPayed: new FormControl(null, {
        updateOn: "blur",
        validators: [
          Validators.required
        ]
      })
    });
    this.finishSaleForm.markAllAsTouched();
  }

  public async finishSale() {
    if (this.finishSaleForm.get('amountPayed').invalid) {
      await this.uiService.showMessageAlert(
        true,
        "Cantidad inválida",
        "No ha ingresado la cantidad pagada del cliente. Por favor ingréselo e inténtelo de nuevo.<br/>",
        ["OK"]
      );
    } else {
      await this.uiService.showLoadingAlert("Procesando venta...");
      this.saleOrderService
        .save(this.saleOrder)
        .subscribe(
          () => {
            this.uiService.dismissLoadingAlert();
            this.closeModal("DONE");
          },
          error => {
            this.uiService.showMessageAlert(
              false,
              "Error al procesar la venta",
              "Ocurrió un error al procesar la venta y guardarla, es posible que el servidor no esté " +
              "disponible o revise su conexión a internet e inténtelo de nuevo. <br><br>" +
              "ERROR: " + error.message,
              [
                {
                  text: "Reintentar",
                  handler: () => this.finishSale()
                },
                {
                  text: "OK"
                }
              ]
            );
          }
        );
    }
  }

  public async verifyPayment(amount: string) {
    const amountAsNumber: number = this.currencyService.getNumberFromCurrencyString(amount);
    if (amountAsNumber !== 0) {
      if (this.saleOrder.total <= amountAsNumber) {
        this.change = amountAsNumber - this.saleOrder.total;
      } else {
        await this.uiService.showMessageAlert(
          false,
          "Cantidad inválida",
          "La cantidad ingresada es inferior al monto a pagar, verifíquelo e inténtelo de nuevo.",
          [{
            text: "OK",
            handler: () => this.finishSaleForm.get("amountPayed").setValue(null)
          }]
        );
      }
    } else {
      await this.uiService.showMessageAlert(
        false,
        "Cantidad inválida",
        "Por favor ingrese valores numéricos mayor o iguales a cero.",
        [{
          text: "OK",
          handler: () => this.finishSaleForm.get("amountPayed").setValue(null)
        }]
      );
    }
  }

  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal(role: string) {
    await this.modalController.dismiss(null, role);
  }
}
