import { Component, OnInit } from '@angular/core';
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ModalController } from "@ionic/angular";

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

  constructor(
    private uiService: UtilUiService,
    private itemService: ItemService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
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
          "",
          "",
          []
        );
      }
    );
  }

  public async uploadCSVFile() {
    await this.modalController.create({
      cssClass: "custom-modal",
      component: InventoryUploadCsvPage
    })
    .then(componentCreated => {
      componentCreated.present();
    });
  }

}
