import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { ModalController } from "@ionic/angular";

import { UtilCurrencyService } from "../../../services/util/util-currency.service";
import { UtilDateService } from "../../../services/util/util-date.service";
import { UtilUiService } from "../../../services/util/util-ui.service";
import { ItemService } from "../../../services/item.service";

import { InventoryUploadCsvPage } from "../inventory-upload-csv/inventory-upload-csv.page";
import { Item } from "../../../model/item.model";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.page.html',
  styleUrls: ['./inventory-list.page.scss'],
})
export class InventoryListPage implements OnInit {

  public itemsList: Item[];
  public ColumnMode = ColumnMode;

  @ViewChild('itemsTable', { static: false }) itemsTable: DatatableComponent;

  constructor(
    public dateService: UtilDateService,
    public currencyService: UtilCurrencyService,
    private uiService: UtilUiService,
    private itemService: ItemService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.itemsList = [];
    await this.loadAllItems();
  }

  private async loadAllItems() {
    await this.uiService.showLoadingAlert("Cargando artículos...");
    this.itemService.getAllItems().subscribe(
      itemsRetrieved => {
        this.itemsList = itemsRetrieved;
        this.uiService.dismissLoadingAlert();
      },
      error => {
        this.uiService.showMessageAlert(
          true,
          "Error al obtener artículos",
          "Ocurrió un error al tratar de obtener los artículos, es posible que el servidor no esté disponible " +
          "o revise su conexión a internet e inténtelo de nuevo.<br><br>ERROR: " + error.error,
          [
            {
              text: "Reintentar",
              handler: () => this.loadAllItems()
            },
            {
              text: "Aceptar",
            }
          ]
        );
      }
    );
  }

  public async uploadCSVFile() {
    await this.modalController.create({
      cssClass: "custom-modal-upload-csv",
      component: InventoryUploadCsvPage
    })
    .then(componentCreated => {
      componentCreated.present();
      componentCreated.onDidDismiss().then(
        data => {
          if (data.role === "DONE") {
            this.ngOnInit();
          }
        }
      );
    });
  }

  public toggleExpandRow(event, row) {
    event.preventDefault();
    this.itemsTable.rowDetail.toggleExpandRow(row);
  }

}
