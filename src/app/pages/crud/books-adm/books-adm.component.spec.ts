import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAdmComponent } from './books-adm.component';

describe('BooksAdmComponent', () => {
  let component: BooksAdmComponent;
  let fixture: ComponentFixture<BooksAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksAdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
