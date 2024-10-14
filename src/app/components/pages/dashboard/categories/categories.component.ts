import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '@services/category/category.service';
import { Column } from '@interfaces/atoms-interfaces';
import { CATEGORY_TABLE_TITLE, categoryColumns } from './categories-constants';
import { Page } from '@interfaces/services/page';
import { Subject } from 'rxjs';
import { CategoryRequest, CategoryResponse } from '@interfaces/models/category-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NOTIFICATION_DEFAULT_MESSAGE, NOTIFICATION_DEFAULT_TYPE } from '@constants/atom-constants';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
  })
  export class CategoriesComponent implements OnInit, OnDestroy {
    private destroyed = new Subject();
    columns: Array<Column> = categoryColumns;
    page?: Page<CategoryResponse>;
    isDataLoaded: boolean = false;
    title: string = CATEGORY_TABLE_TITLE;
    isModalOpen: boolean = false;
  
    notification = {
      show: false,
      type: NOTIFICATION_DEFAULT_TYPE,
      message: NOTIFICATION_DEFAULT_MESSAGE,
    };
  
    currentPage: number = 0;
    pageSize: number = 10;
    sortBy: string = 'name'; // Nombre del campo por defecto para ordenar
    asc: boolean = true; // Orden ascendente por defecto
  
    constructor(private categoryService: CategoryService) {}
  
    ngOnInit(): void {
      this.reloadCategories();
    }
  
    ngOnDestroy(): void {
      this.destroyed.complete();
    }
  
    handleFormSubmit(category: CategoryRequest): void {
      this.categoryService.saveCategory(category).subscribe(
        () => {
          this.showNotification('Success', 'Categoría guardada con éxito');
          this.reloadCategories();
          this.closeModal();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.showNotification('Error', error.error.Message || 'La categoría ya existe');
          } else {
            this.showNotification('Error', 'Error inesperado al guardar la categoría');
          }
        }
      );
    }
  
    showNotification(type: 'Error' | 'Warning' | 'Success' | 'Inform', message: string): void {
      this.notification = { show: true, type: type, message: message };
      setTimeout(() => this.clearNotification(), 5000);
    }
  
    clearNotification(): void {
      this.notification.show = false;
    }
  
    // Actualizar las categorías según los parámetros de paginación y ordenación
    reloadCategories(): void {
      this.categoryService
        .getCategories({
          page: this.currentPage,
          pageSize: this.pageSize,
          sortBy: this.sortBy,
          asc: this.asc,
        })
        .subscribe((data) => {
          this.page = data;
          this.isDataLoaded = true;
        });
    }
  
    // Cambiar de página
    onPageChange(newPage: number): void {
      this.currentPage = newPage;
      this.reloadCategories();
    }
  
    // Actualizar el número de elementos por página
    onShowByChange(pageSize: number): void {
        console.log('Page size changed to:', pageSize); // Verificar recepción del evento
        this.pageSize = pageSize;
        this.currentPage = 0; // Reiniciar la página cuando cambia el tamaño de página
        this.reloadCategories(); // Recargar los datos
    }
  
    // Cambiar el criterio de ordenación
    onSortChange(event: { criteria: string; direction: string }): void {
        console.log('Ordenamiento recibido:', event); // Verificar recepción del evento
        this.sortBy = event.criteria;
        this.asc = event.direction === 'asc';
        this.currentPage = 0; // Reiniciar la página cuando cambia el orden
        this.reloadCategories(); // Recargar los datos
    }
  
    openModal(): void {
      this.isModalOpen = true;
    }
  
    closeModal(): void {
      this.isModalOpen = false;
      this.clearNotification();
    }
  }  