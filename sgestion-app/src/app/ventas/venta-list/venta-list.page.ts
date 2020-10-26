import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";

import { ItemService } from "../../../services/item.service";
import { UtilCurrencyService } from "../../../services/util/util-currency.service";
import { UtilUiService } from "../../../services/util/util-ui.service";

import { FinishSalePage } from "../finish-sale/finish-sale.page";
import { SaleOrderLine } from "../../../model/sale-order-line.model";
import { SaleOrder } from "../../../model/sale-order.model";
import { Item } from "../../../model/item.model";


@Component({
  selector: 'app-venta-list',
  templateUrl: './venta-list.page.html',
  styleUrls: ['./venta-list.page.scss'],
})
export class VentaListPage implements OnInit {

  constructor(
    public currencyService: UtilCurrencyService,
    private uiService: UtilUiService,
    private modalController: ModalController,
    private itemService: ItemService,
  ) { }

  public saleOrder: SaleOrder;

  @ViewChild('itemComponent', { static: false }) itemComponent: IonicSelectableComponent;
  public items: Item[];

  async ngOnInit() {
    this.saleOrder = new SaleOrder();
    this.items = [];

    await this.loadItems();
  }

  private async loadItems() {
    await this.uiService.showLoadingAlert("Cargando artículos...");
    this.itemService
      .getAllItems()
      .subscribe(
        items => {
          this.items = items;
          this.uiService.dismissLoadingAlert();
        },
        error => {
          this.uiService.showMessageAlert(
            false,
            "Error al cargar artículos ",
            "No fue posible cargar los artículos disponibles en el inventario. <br><br>ERROR: " + error.message,
            ["OK"]
          );
        }
      );
  }

  public async addItem() {
    this.itemComponent.clear();
    await this.itemComponent.open();
  }

  public async deleteSaleOrderLine(saleOrderLine: SaleOrderLine) {
    const index: number = this.saleOrder.orderLines.findIndex(line => line === saleOrderLine);
    if (index >= 0) {
      this.saleOrder.orderLines.splice(index, 1);
    }
    await this.updateTotal();
  }

  public async updateQuantity(quantity: string, saleOrderLine: SaleOrderLine) {
    let quantityNumberValue: number = await this.currencyService.getNumberFromCurrencyString(quantity.toString());
    if (quantityNumberValue > 0) {
      saleOrderLine.quantity = quantityNumberValue;
      saleOrderLine.totalLine = saleOrderLine.itemPrice * saleOrderLine.quantity;
    } else {
      saleOrderLine.quantity = 1;
      saleOrderLine.totalLine = saleOrderLine.itemPrice * saleOrderLine.quantity;
      await this.uiService.showMessageAlert(
        true,
        "Error en la cantidad",
        "Ingresó un valor inválido o ingresó '0', verifíquelo e inténtelo de nuevo.",
        ["OK"]
      );
    }
    await this.updateTotal();
  }

  public async updateTotal() {
    let totalTmp: number = 0;
    this.saleOrder.orderLines.forEach(line => totalTmp += line.totalLine);
    this.saleOrder.total = totalTmp;
  }

  public async finishSale() {
    await this.modalController
      .create({
        component: FinishSalePage,
        componentProps: {
          saleOrder: this.saleOrder
        }
      })
      .then(componentCreated => {
        componentCreated.present();
        componentCreated.onDidDismiss().then(
          dataReturned => {
            if (dataReturned.role === "DONE") {
              this.ngOnInit();
            }
          }
        );
      });
  }

  public async searchItem(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    const textToSearchItems = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (textToSearchItems) {
      event.component.items = this.items.filter(
        item => item.name.toLowerCase().includes(textToSearchItems) || item.description.toLowerCase().includes(textToSearchItems)
      );
    } else {
      event.component.items = this.items;
    }

    event.component.endSearch();

  }

  public async selectItem(event: {
    component: IonicSelectableComponent,
    item: Item,
    isSelected: boolean
  }) {
    if (event.item && event.isSelected) {
      const saleOrderLine = new SaleOrderLine()
      saleOrderLine.itemId = event.item.id;
      saleOrderLine.itemName = event.item.name;
      saleOrderLine.itemDescription = event.item.description;
      saleOrderLine.itemPrice = event.item.price;
      saleOrderLine.quantity = 1;
      saleOrderLine.totalLine = saleOrderLine.itemPrice * saleOrderLine.quantity;
      this.saleOrder.orderLines.push(saleOrderLine);
      await this.updateTotal();
    }
  }
}
