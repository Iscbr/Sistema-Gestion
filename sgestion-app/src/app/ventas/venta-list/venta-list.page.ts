import { Component, OnInit } from '@angular/core';
import { SaleOrderService } from "../../../services/sale-order.service";
import { ItemService } from "../../../services/item.service";
import { Item } from "../../../model/item.model";

@Component({
  selector: 'app-venta-list',
  templateUrl: './venta-list.page.html',
  styleUrls: ['./venta-list.page.scss'],
})
export class VentaListPage implements OnInit {

  constructor(
    private itemService: ItemService,
    private saleOrderService: SaleOrderService
  ) { }

  private items: Item[]

  ngOnInit() {
    this.itemService
      .getAllItems()
      .subscribe(
        items => {
          console.log("Items: ", items);
        },
        error => {
          console.log("Items error: ", error)
        }
      );

    this.saleOrderService
      .getAllSaleOrders()
      .subscribe(
        saleOrders => {
          console.log("SaleOrders: ", saleOrders);
        },
        error => {
          console.log("SaleOrders error: ", error);
        }
      );

  }

}
