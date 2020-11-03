import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ColumnMode, DatatableComponent, SelectionType } from "@swimlane/ngx-datatable";

import { UtilCurrencyService } from "../../../services/util/util-currency.service";
import { SaleOrderService } from "../../../services/sale-order.service";
import { UtilDateService } from "../../../services/util/util-date.service";
import { UtilUiService } from "../../../services/util/util-ui.service";

import { SaleDetailPage } from "../sale-detail/sale-detail.page";
import { SaleOrder } from "../../../model/sale-order.model";

@Component({
  selector: 'app-venta-list',
  templateUrl: './sale-list.page.html',
  styleUrls: ['./sale-list.page.scss'],
})
export class SaleListPage implements OnInit {

  constructor(
    public dateService: UtilDateService,
    public currencyService: UtilCurrencyService,
    private uiService: UtilUiService,
    private modalController: ModalController,
    private saleOrderService: SaleOrderService,
  ) { }

  public saleOrderList: SaleOrder[];

  @ViewChild('ordersTable', { static: false }) ordersTable: DatatableComponent;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;

  async ngOnInit() {
    this.saleOrderList = [];
  }

  async ionViewWillEnter() {
    await this.loadItems();
  }

  private async loadItems() {
    await this.uiService.showLoadingAlert("Cargando artículos...");
    this.saleOrderService.getAllSaleOrders()
      .subscribe(
        saleOrders => {
          this.saleOrderList = saleOrders;
          this.uiService.dismissLoadingAlert();
        },
        error => {
          this.uiService.showMessageAlert(
            false,
            "Error al cargar ventas ",
            "No fue posible cargar todas las ventas. <br><br>ERROR: " + error.message,
            ["OK"]
          );
        }
      );
  }

  public async onSelect(event) {
    const saleOrderSelected = event.selected[0];
    await this.modalController
      .create({
        cssClass: "custom-modal-sale-detail",
        component: SaleDetailPage,
        componentProps: {
          saleOrder: saleOrderSelected
        }
      })
      .then(componentCreated => componentCreated.present());
  }
  public toggleExpandRow(event, row) {
    event.preventDefault();
    this.ordersTable.rowDetail.toggleExpandRow(row);
  }
}
