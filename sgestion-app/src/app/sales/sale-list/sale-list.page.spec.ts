import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaleListPage } from './sale-list.page';

describe('VentaListPage', () => {
  let component: SaleListPage;
  let fixture: ComponentFixture<SaleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
