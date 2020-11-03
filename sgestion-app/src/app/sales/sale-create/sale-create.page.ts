import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from "ionic-selectable";
import { ModalController } from "@ionic/angular";
import { timer } from "rxjs";

import { UtilCurrencyService } from "../../../services/util/util-currency.service";
import { UtilUiService } from "../../../services/util/util-ui.service";
import { ItemService } from "../../../services/item.service";

import { Item } from "../../../model/item.model";
import { SaleOrder } from "../../../model/sale-order.model";
import { SaleOrderLine } from "../../../model/sale-order-line.model";
import { SaleFinishPage } from "../sale-finish/sale-finish.page";

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.page.html',
  styleUrls: ['./sale-create.page.scss'],
})
export class SaleCreatePage implements OnInit {

  constructor(
    public currencyService: UtilCurrencyService,
    private uiService: UtilUiService,
    private modalController: ModalController,
    private itemService: ItemService,
  ) { }

  public saleOrder: SaleOrder;
  public bnShowMessage: boolean;

  @ViewChild('itemComponent', { static: false }) itemComponent: IonicSelectableComponent;
  public items: Item[];

  async ngOnInit() {
    this.saleOrder = new SaleOrder();
    this.items = [];

    this.bnShowMessage = false;

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
      const stockAvailable = this.items.find(item => item.id === saleOrderLine.itemId).stock;
      if (stockAvailable >= quantityNumberValue) {
        saleOrderLine.quantity = quantityNumberValue;
        saleOrderLine.totalLine = saleOrderLine.itemPrice * saleOrderLine.quantity;
      } else {
        saleOrderLine.quantity = 1;
        saleOrderLine.totalLine = saleOrderLine.itemPrice * saleOrderLine.quantity;
        await this.uiService.showMessageAlert(
          false,
          "Stock insuficiente",
          "No existe suficiente stock disponible para satisfacer la cantidad solicitada.",
          ["OK"]
        );
      }
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
    this.saleOrder.clientName = "Mostrador";
    this.saleOrder.employeeName = "Vendedor test";
    this.saleOrder.status = "COMPLETADA";

    await this.modalController
      .create({
        cssClass: "custom-modal-finish-sale",
        component: SaleFinishPage,
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
              this.bnShowMessage = true;
              this.setTimer(5);
            }
          }
        );
      });
  }

  private setTimer(seconds: number) {
    const source = timer(1000, 1000);
    const timerSubscription = source.subscribe(value => {
      if (value === seconds) {
        this.bnShowMessage = false;
        timerSubscription.unsubscribe();
      }
    })
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
