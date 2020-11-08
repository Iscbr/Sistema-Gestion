import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UtilCurrencyService } from "../../../services/util/util-currency.service";
import { UtilUiService } from "../../../services/util/util-ui.service";
import { ItemService } from "../../../services/item.service";

import { InventoryItemDetailPage } from "../inventory-item-detail/inventory-item-detail.page";
import { Item } from "../../../model/item.model";

@Component({
  selector: 'app-inventory-item-create',
  templateUrl: './inventory-item-create.page.html',
  styleUrls: ['./inventory-item-create.page.scss'],
})
export class InventoryItemCreatePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private currencyService: UtilCurrencyService,
    private uiService: UtilUiService,
    private router: Router,
    private itemService: ItemService
  ) {
    this.newItemForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required, updateOn: "blur" }),
      description: new FormControl(null, { validators: Validators.required, updateOn: "blur" }),
      price: new FormControl(null, { validators: Validators.required, updateOn: "blur" }),
      stock: new FormControl(null, { validators: Validators.required, updateOn: "blur" }),
      active: new FormControl(true, { updateOn: "blur" })
    });
    this.newItemForm.markAllAsTouched();
  }

  public newItemForm: FormGroup;
  @Input() private idItem: number;
  private item: Item;
  private editItem: boolean;
  public title: string;

  public async ngOnInit() {
    await this.uiService.showLoadingAlert("Cargando...");
    if (this.idItem) {
      this.title = "Editar artículo";
      this.editItem = true;
      await this.loadItem();
    } else {
      this.title = "Crear artículo";
      this.editItem = false;
      this.item = new Item();
    }
    await this.uiService.dismissLoadingAlert();
  }

  public async loadItem() {
    this.itemService.getById(this.idItem).subscribe(
      itemRetrieved => {
        this.item = itemRetrieved;
        this.newItemForm.reset(this.item);
      },
      error => this.uiService.showMessageAlert(
        false,
        "Error al cargar artículo",
        "Ocurrió un error al cargar el artículo, es posible que el servidor no esté disponible o revise su " +
        "conexión e inténtelo más tarde.<br><br>ERROR: " + error.error,
        [{
          text: "OK",
          handler: () => this.router.navigate(["/", "inventory"])
        }]
      )
    )
  }

  public parsePrice(amount: string) {
    const amountAsNumber = this.currencyService.getNumberFromCurrencyString(amount.toString());
    const amountAsCurrencyString = this.currencyService.formatAmountToCurrencyString(amountAsNumber);
    this.newItemForm.get("price").setValue(amountAsCurrencyString);
  }

  public async onSubmit() {
    await this.uiService.showLoadingAlert("Guardando...")
    const errorMessage = await this.validateForm();
    if (errorMessage !== "") {
      await this.uiService.showMessageAlert(
        true,
        "Error de validación",
        "Por favor verifique los siguientes errores: <br><br>" + errorMessage,
        ["OK"])
    } else {
      if (this.editItem) {
        // EDITION OF ITEM
        await this.mapFormToItem();
        this.itemService.update(this.idItem, this.item).subscribe(
          itemUpdated => {
            this.modalController
              .create({
                cssClass: "custom-modal-sale-detail",
                component: InventoryItemDetailPage,
                componentProps: {
                  item: itemUpdated
                }
              })
              .then(componentCreated => componentCreated.present());
            this.uiService.dismissLoadingAlert();
            this.closeModal('DONE');
          },
          error => this.uiService.showMessageAlert(
            false,
            "Error al actualizar artículo",
            "Ocurrió un error al actualizar el artículo, es posible que el servidor no esté disponible o " +
            "revise su conexión e inténtelo más tarde.<br><br>ERROR: " + error.error,
            [{
              text: "OK",
              handler: () => this.router.navigate(["/", "inventory"])
            }]
          )
        )
      } else {
        // CREATION OF ITEM
        await this.mapFormToItem();
        this.itemService.save(this.item).subscribe(
          itemCreated => {
            this.modalController
              .create({
                cssClass: "custom-modal-sale-detail",
                component: InventoryItemDetailPage,
                componentProps: {
                  item: itemCreated
                }
              })
              .then(componentCreated => componentCreated.present());
            this.uiService.dismissLoadingAlert();
            this.closeModal("DONE");
          },
          error => this.uiService.showMessageAlert(
            false,
            "Error al guardar artículo",
            "Ocurrió un error al guardar el artículo, es posible que el servidor no esté disponible o " +
            "revise su conexión e inténtelo más tarde.<br><br>ERROR: " + error.error,
            [{
              text: "OK",
              handler: () => this.router.navigate(["/", "inventory"])
            }]
          )
        );
      }
    }
  }

  private async mapFormToItem() {
    this.item.name = this.newItemForm.get("name").value;
    this.item.description = this.newItemForm.get("description").value;
    this.item.price = this.currencyService.getNumberFromCurrencyString(this.newItemForm.get("price").value);
    this.item.stock = parseInt(this.newItemForm.get("stock").value);
    this.item.active = this.newItemForm.get("active").value;
    return this.item;
  }

  private async validateForm() {
    let message = "";
    if (this.newItemForm.get("name").invalid)
      message += "- El <b>Nombre del artículo</b> es obligatorio.<br>"
    if (this.newItemForm.get("description").invalid)
      message += "- La <b>descripción del artículo</b> es obligatoria. <br>"
    if (this.newItemForm.get("price").invalid)
      message += "- El <b>Precio</b> es obligatorio. <br>"
    if (this.newItemForm.get("stock").invalid)
      message += "- El <b>Stock</b> es obligatorio. <br>"
    return message;
  }

  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal(role: string) {
    await this.modalController.dismiss(null, role);
  }

}
