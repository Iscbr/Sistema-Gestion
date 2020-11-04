import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
    private uiService: UtilUiService,
    private router: Router,
    private itemService: ItemService
  ) {
    this.newItemForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required, updateOn: "blur" }),
      description: new FormControl(null, { validators: Validators.required, updateOn: "blur" }),
      price: new FormControl(null, { validators: Validators.required, updateOn: "blur" }),
      stock: new FormControl(null, { validators: Validators.required, updateOn: "blur" }),
      // active: new FormControl(true, { updateOn: "blur" })
    });
    this.newItemForm.markAllAsTouched();
  }

  @Input() private idItem: number;
  private item: Item;
  public newItemForm: FormGroup;
  private editItem: boolean;

  public async ngOnInit() {
    if (this.idItem) {
      this.editItem = true;
      await this.loadItem();
    } else {
      this.editItem = false;
    }
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

  public async onSubmit() {
    const errorMessage = await this.validateForm();
    if (errorMessage !== "") {
      await this.uiService.showMessageAlert(
        true,
        "Error de validación",
        "Por favor verifique los siguientes errores: <br><br>" + errorMessage,
        ["OK"])
    } else {
      if (this.editItem) {
        await this.mapFormToItem();
        this.itemService.update(this.idItem, this.item).subscribe(
          itemUpdated => this.modalController
            .create({
              cssClass: "custom-modal-sale-detail",
              component: InventoryItemDetailPage,
              componentProps: {
                item: itemUpdated
              }
            })
            .then(componentCreated => componentCreated.present())
          ,
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
        await this.mapFormToItem();
        this.itemService.save(this.item).subscribe(
          itemCreated => this.modalController
            .create({
              cssClass: "custom-modal-sale-detail",
              component: InventoryItemDetailPage,
              componentProps: {
                item: itemCreated
              }
            })
            .then(componentCreated => componentCreated.present())
        );
      }
    }
  }

  private async mapFormToItem() {
    this.item.name = this.newItemForm.get("name").value;
    this.item.description = this.newItemForm.get("description").value;
    this.item.price = parseFloat(this.newItemForm.get("price").value);
    this.item.stock = parseInt(this.newItemForm.get("stock").value);
    return this.item;
  }

  private async validateForm() {
    let message = "";
    if (this.newItemForm.get("name").invalid)
      message += "- El <b>Nombre del artículo</b> es obligatorio"
    if (this.newItemForm.get("description").invalid)
      message += "- La <b>descripción del artículo</b> es obligatoria"
    if (this.newItemForm.get("price").invalid)
      message += "- El <b>Precio</b> es obligatorio"
    if (this.newItemForm.get("stock").invalid)
      message += "- El <b>Stock</b> es obligatorio"
    return message;
  }

  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal(role: string) {
    await this.modalController.dismiss(null, role);
  }

}
