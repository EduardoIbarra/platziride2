import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RidePage } from './ride.page';

describe('RidePage', () => {
  let component: RidePage;
  let fixture: ComponentFixture<RidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
