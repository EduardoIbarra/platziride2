import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RideFormPage } from './ride-form.page';

describe('RideFormPage', () => {
  let component: RideFormPage;
  let fixture: ComponentFixture<RideFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RideFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
