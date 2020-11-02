import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaleCreatePage } from './sale-create.page';

describe('SaleCreatePage', () => {
  let component: SaleCreatePage;
  let fixture: ComponentFixture<SaleCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
