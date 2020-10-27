import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

import { UtilUiService } from "../../../services/util/util-ui.service";

import { CsvFile } from "../../../model/csv-file.model";

@Component({
  selector: 'app-inventory-upload-csv',
  templateUrl: './inventory-upload-csv.page.html',
  styleUrls: ['./inventory-upload-csv.page.scss'],
})
export class InventoryUploadCsvPage implements OnInit {

  constructor(
    private uiService: UtilUiService,
    private modalController: ModalController
  ) { }

  public csvFile: CsvFile;

  ngOnInit() {
    this.csvFile = new CsvFile();
    this.csvFile.content = "";
  }

  handleFileSelect(event) {
    if (event.target.files.length === 1) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event: any) => {
        this.csvFile.fileName = file.name;
        this.csvFile.fileType = file.type;
        this.csvFile.content = event.target.result;
      }
    }
  }

  public async sendFileToServer() {
    if (this.csvFile.content !== '') {
      console.log("Send to server.");
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
