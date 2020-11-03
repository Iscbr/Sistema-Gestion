import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaleFinishPage } from './sale-finish.page';

describe('FinishSalePage', () => {
  let component: SaleFinishPage;
  let fixture: ComponentFixture<SaleFinishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleFinishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleFinishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
