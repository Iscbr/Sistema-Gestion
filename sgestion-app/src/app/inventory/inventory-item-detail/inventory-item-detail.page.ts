import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

import { UtilCurrencyService } from "../../../services/util/util-currency.service";
import { UtilDateService } from "../../../services/util/util-date.service";
import { UtilUiService } from "../../../services/util/util-ui.service";
import { ItemService } from "../../../services/item.service";

import { InventoryItemCreatePage } from "../inventory-item-create/inventory-item-create.page";
import { Item } from "../../../model/item.model";

@Component({
  selector: 'app-inventory-item-detail',
  templateUrl: './inventory-item-detail.page.html',
  styleUrls: ['./inventory-item-detail.page.scss'],
})
export class InventoryItemDetailPage implements OnInit {

  constructor(
    public dateService: UtilDateService,
    public currencyService: UtilCurrencyService,
    private uiService: UtilUiService,
    private modalController: ModalController,
    private itemService: ItemService
  ) { }

  @Input() public item: Item;

  ngOnInit() {
  }

  public async deleteItem() {
    await this.uiService.showMessageAlert(
      false,
      "¿Está seguro de eliminar el artículo?",
      "<b>NOTA:</b> Una vez se elimina el artículo esta operación no se puede revertir.",
      [
        {
          text: "Sí, Eliminar",
          handler: () => {
            this.uiService.showLoadingAlert("Eliminando...");
            this.itemService.delete(parseInt(this.item.id)).subscribe(
              () => {
                this.uiService.dismissLoadingAlert();
                this.closeModal("DONE");
              },
              error => this.uiService.showMessageAlert(
                true,
                "Error al eliminar artículo",
                "Ocurrió un error al eliminar el artículo, es posible que el servidor no esté disponible " +
                "o revise su conexión a internet e inténtelo de nuevo.<br><br>ERROR: " + error.error,
                [
                  {
                    text: "Reintentar",
                    handler: () => this.deleteItem()
                  },
                  {
                    text: "Aceptar",
                  }
                ]
              )
            );
          }
        },
        {
          text: "Cancelar"
        }
      ]
    );
  }

  public async editItem() {
    await this.closeModal("CLOSE");
    this.modalController.create({
      cssClass: "custom-modal-sale-detail",
      component: InventoryItemCreatePage,
      componentProps: {
        idItem: this.item.id
      }
    })
    .then(componentCreated => componentCreated.present());
  }
  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal(role: string) {
    await this.modalController.dismiss(null, role);
  }

}
