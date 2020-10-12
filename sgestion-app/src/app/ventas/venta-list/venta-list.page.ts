import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from "@ionic/angular";

import { SaleOrderService } from "../../../services/sale-order.service";
import { ItemService } from "../../../services/item.service";

import { IonicSelectableComponent } from "ionic-selectable";
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
    private loadingController: LoadingController,
    private alertController: AlertController,
    private itemService: ItemService,
    private saleOrderService: SaleOrderService
  ) { }

  public saleOrder: SaleOrder;

  @ViewChild('itemComponent', { static: false }) itemComponent: IonicSelectableComponent;
  public items: Item[];

  private loadingElement: HTMLIonLoadingElement;

  async ngOnInit() {
    this.saleOrder = new SaleOrder();
    this.items = [];

    await this.loadItems();
  }

  private async loadItems() {
    await this.showLoadingAlert("Cargando artículos...");
    this.itemService
      .getAllItems()
      .subscribe(
        items => {
          this.items = items;
          this.dismissLoadingAlert();
        },
        error => {
          this.showMessageAlert(
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
    let quantityNumberValue: number = await VentaListPage.getNumberFromString(quantity.toString());
    if (quantityNumberValue > 0) {
      saleOrderLine.quantity = quantityNumberValue;
      saleOrderLine.totalLine = saleOrderLine.itemPrice * saleOrderLine.quantity;
    } else {
      saleOrderLine.quantity = 1;
      saleOrderLine.totalLine = saleOrderLine.itemPrice * saleOrderLine.quantity;
      await this.showMessageAlert(
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
