import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryUploadCsvPage } from './inventory-upload-csv.page';

describe('InventoryUploadCsvPage', () => {
  let component: InventoryUploadCsvPage;
  let fixture: ComponentFixture<InventoryUploadCsvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryUploadCsvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryUploadCsvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
