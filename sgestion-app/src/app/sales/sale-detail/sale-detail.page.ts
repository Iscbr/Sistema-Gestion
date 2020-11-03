import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

import { UtilDateService } from "../../../services/util/util-date.service";
import { UtilCurrencyService } from "../../../services/util/util-currency.service";

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
    private modalController: ModalController
  ) { }

  @Input() public saleOrder: SaleOrder;

  ngOnInit() {
  }

  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal(role: string) {
    await this.modalController.dismiss(null, role);
  }
}
