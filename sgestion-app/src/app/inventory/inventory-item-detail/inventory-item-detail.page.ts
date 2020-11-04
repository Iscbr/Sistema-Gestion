import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

import { UtilDateService } from "../../../services/util/util-date.service";
import { UtilCurrencyService } from "../../../services/util/util-currency.service";

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
    private modalController: ModalController
  ) { }

  @Input() public item: Item;

  ngOnInit() {
  }

  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal(role: string) {
    await this.modalController.dismiss(null, role);
  }

}
