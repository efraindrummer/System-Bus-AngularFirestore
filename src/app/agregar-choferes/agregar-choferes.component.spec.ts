import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarChoferesComponent } from './agregar-choferes.component';

describe('AgregarChoferesComponent', () => {
  let component: AgregarChoferesComponent;
  let fixture: ComponentFixture<AgregarChoferesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarChoferesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
