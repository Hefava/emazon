import { Component, Input, OnInit } from '@angular/core';
import { Column } from '@interfaces/atoms-interfaces';
import { Page } from '@interfaces/services/page';

@Component({
    selector: 'paginated-datatable',
    templateUrl: './paginated-datatable.component.html',
    styleUrls: ['./paginated-datatable.component.scss'],
})
export class PaginatedDatatableComponent<T extends Record<string, any>>
    implements OnInit
{
    @Input() columns?: Array<Column>;
    @Input() page?: Page<T>; // Recibe el objeto paginado con los datos
    rows: Array<T> = [];

    ngOnInit(): void {
        if (this.page) {
            this.rows = this.page.content; // Actualiza las filas de la tabla con los datos de la página
        }
    }

    // Detecta cuando cambian los datos de la página
    ngOnChanges(): void {
        if (this.page) {
            this.rows = this.page.content;
        }
    }
}