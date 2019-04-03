import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMaquinariaaComponent } from './registrar-maquinariaa.component';

describe('RegistrarMaquinariaaComponent', () => {
  let component: RegistrarMaquinariaaComponent;
  let fixture: ComponentFixture<RegistrarMaquinariaaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarMaquinariaaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarMaquinariaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
