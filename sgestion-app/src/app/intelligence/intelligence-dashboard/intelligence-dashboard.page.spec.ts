import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntelligenceDashboardPage } from './intelligence-dashboard.page';

describe('IntelligenceDashboardPage', () => {
  let component: IntelligenceDashboardPage;
  let fixture: ComponentFixture<IntelligenceDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligenceDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntelligenceDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
