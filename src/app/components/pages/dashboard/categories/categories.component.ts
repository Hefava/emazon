import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '@services/category/category.service';
import { Column } from '@interfaces/atoms-interfaces';
import { categoryColumns } from './categories-constants';
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

    notification = {
        show: false,
        type: NOTIFICATION_DEFAULT_TYPE,
        message: NOTIFICATION_DEFAULT_MESSAGE
    };

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.reloadCategories();
    }

    ngOnDestroy(): void {
        this.destroyed.complete();
    }

    handleFormSubmit(category: CategoryRequest): void {
        console.log('Datos del formulario enviados:', category); 
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

    showNotification(type: 'Error' | 'Warning' | 'Success' | 'Inform', message: string): void {
        console.log('Mostrando notificación:', { type, message }); 
        this.notification = { show: true, type: type, message: message };
        setTimeout(() => this.clearNotification(), 5000);
    }

    clearNotification(): void {
        this.notification.show = false;
    }

    reloadCategories(): void {
        this.categoryService.getCategories({}).subscribe((data) => {
            this.page = data;
            this.isDataLoaded = true;
        });
    }
}