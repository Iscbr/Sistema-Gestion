import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VentaListPage } from './venta-list.page';

describe('VentaListPage', () => {
  let component: VentaListPage;
  let fixture: ComponentFixture<VentaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VentaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
