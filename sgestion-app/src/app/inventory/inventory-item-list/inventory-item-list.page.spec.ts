import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryItemListPage } from './inventory-item-list.page';

describe('InventoryListPage', () => {
  let component: InventoryItemListPage;
  let fixture: ComponentFixture<InventoryItemListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryItemListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryItemListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
