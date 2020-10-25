import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinishSalePage } from './finish-sale.page';

describe('FinishSalePage', () => {
  let component: FinishSalePage;
  let fixture: ComponentFixture<FinishSalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishSalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinishSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
