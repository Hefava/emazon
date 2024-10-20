import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationBarComponent } from './pagination-bar.component';

describe('PaginationBarComponent', () => {
  let component: PaginationBarComponent;
  let fixture: ComponentFixture<PaginationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sortChange event with correct criteria and direction', () => {
    jest.spyOn(component.sortChange, 'emit');
    
    const sortEvent = { criteria: 'name', direction: 'asc' };
    component.onSortChange(sortEvent);

    expect(component.sortChange.emit).toHaveBeenCalledWith(sortEvent);
    expect(component.sortChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit showByChange event with correct page size', () => {
    jest.spyOn(component.showByChange, 'emit');
    
    const pageSize = 10;
    component.onShowByChange(pageSize);

    expect(component.showByChange.emit).toHaveBeenCalledWith(pageSize);
    expect(component.showByChange.emit).toHaveBeenCalledTimes(1);
  });
});