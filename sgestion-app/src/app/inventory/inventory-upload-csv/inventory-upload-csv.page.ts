import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { HttpEventType } from "@angular/common/http";

import { UtilUiService } from "../../../services/util/util-ui.service";
import { ItemService } from "../../../services/item.service";

import { CsvFile } from "../../../model/csv-file.model";

@Component({
  selector: 'app-inventory-upload-csv',
  templateUrl: './inventory-upload-csv.page.html',
  styleUrls: ['./inventory-upload-csv.page.scss'],
})
export class InventoryUploadCsvPage implements OnInit {

  constructor(
    private uiService: UtilUiService,
    private modalController: ModalController,
    private itemService: ItemService
  ) { }

  public file: File;
  public csvFile: CsvFile;

  ngOnInit() {
    this.csvFile = new CsvFile();
    this.csvFile.content = "";
  }

  handleFileSelect(event) {
    if (event.target.files.length === 1) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(this.file);
      reader.onload = (event: any) => {
        this.csvFile.fileName = this.file.name;
        this.csvFile.fileType = this.file.type;
        this.csvFile.content = event.target.result;
      }
    }
  }

  public async sendFileToServer() {
    await this.uiService.showLoadingAlert("Enviando archivo...");
    if (this.csvFile.content !== '') {
      this.itemService.uploadFile(this.file).subscribe(
        response => {
          if (response.type === HttpEventType.Response) {
            this.uiService.showMessageAlert(
              false,
              "Archivo cargado exitósamente",
              response.body.message,
              [
                {
                  text: "OK",
                  handler: () => this.closeModal("DONE")
                }
              ]);
          }
        },
        error => {
          console.log(error);
          this.uiService.showMessageAlert(
            false,
            "Error al procesar el archivo",
            "No fue posible procesar el archivo que adjuntó. <br><br>ERROR: " + error.error,
            ["OK"]
          );
        }
      );
    } else {
      await this.uiService.showMessageAlert(
        false,
        "Archivo inexistente",
        "No ha adjuntado ningún archivo CSV, adjunte un archivo dándo clic en el botón 'Adjuntar CSV' e inténtelo de nuevo.",
        ["OK"]
      );
    }
  }
  /**
   * Se cierra el componente y no se envía ninguna información al componente padre.
   */
  public async closeModal(role: string) {
    await this.modalController.dismiss(null, role);
  }

}
