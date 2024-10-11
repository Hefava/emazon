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

    notification = {
        show: false,
        type: NOTIFICATION_DEFAULT_TYPE,
        message: NOTIFICATION_DEFAULT_MESSAGE
    };

    currentPage: number = 0;
    pageSize: number = 10;

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.reloadCategories();  
    }

    ngOnDestroy(): void {
        this.destroyed.complete();
    }

    // Método para manejar el envío del formulario de categorías
    handleFormSubmit(category: CategoryRequest): void {
        this.categoryService.saveCategory(category).subscribe(
            () => {
                this.showNotification('Success', 'Categoría guardada con éxito');
                this.reloadCategories(); 
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

    // Mostrar una notificación temporal
    showNotification(type: 'Error' | 'Warning' | 'Success' | 'Inform', message: string): void {
        this.notification = { show: true, type: type, message: message };
        setTimeout(() => this.clearNotification(), 5000);
    }

    clearNotification(): void {
        this.notification.show = false;
    }

    // Cargar categorías del backend con la paginación
    reloadCategories(): void {
        this.categoryService.getCategories({
            page: this.currentPage,
            pageSize: this.pageSize,
            asc: true
        }).subscribe((data) => {
            this.page = data;
            this.isDataLoaded = true;
        });
    }

    // Actualizar cuando el paginador cambia de página
    onPageChange(newPage: number): void {
        this.currentPage = newPage;
        this.reloadCategories(); 
    }
}
