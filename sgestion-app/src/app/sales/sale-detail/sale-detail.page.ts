import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

import { UtilCurrencyService } from "../../../services/util/util-currency.service";
import { SaleOrderService } from "../../../services/sale-order.service";
import { UtilDateService } from "../../../services/util/util-date.service";
import { UtilUiService } from "../../../services/util/util-ui.service";

import { SaleOrder } from "../../../model/sale-order.model";

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.page.html',
  styleUrls: ['./sale-detail.page.scss'],
})
export class SaleDetailPage implements OnInit {

  constructor(
    public currencyService: UtilCurrencyService,
    public dateService: UtilDateService,
    private uiService: UtilUiService,
    private saleOrderService: SaleOrderService,
    private modalController: ModalController
  ) { }

  @Input() public saleOrder: SaleOrder;

  ngOnInit() {
  }

  public async cancelSaleOrder() {
    await this.uiService.showMessageAlert(
      true,
      "Cancelar Venta",
      "¿Está seguro de que desea cancelar la venta? <br><br>El stock de todos los productos en la venta " +
      "volverá a estar disponible",
      [
        {
          text: "Aceptar",
          handler: () => {
            this.saleOrder.status = "CANCELADA";
            this.saleOrderService.update(this.saleOrder.id, this.saleOrder).subscribe(
              () => this.closeModal("DONE"),
              error => {
                console.log(error);
                this.uiService.showMessageAlert(
                  false,
                  "Error al guardar",
                  "Ocurrió un error al cancelar la venta. <br><br>ERROR: " + error.error.message,
                  [
                    {
                      text: "Reintentar",
                      handler: () => this.cancelSaleOrder()
                    },
                    {
                      text: "Cerrar",
                      handler: () => this.closeModal("CLOSED")
                    }
                  ]
                )
              }
            );
          }
        },
        {
          text: "Cancelar"
        }
      ]
    );
  }

  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal(role: string) {
    await this.modalController.dismiss(null, role);
  }
}
