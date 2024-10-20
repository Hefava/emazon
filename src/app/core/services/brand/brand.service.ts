import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageQuery } from '@interfaces/services/queries';
import { environment } from 'src/environments/environment';
import { Page } from '@interfaces/services/page';
import { BrandRequest, BrandResponse } from '@interfaces/models/brand-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private brandAPIUrl = environment.stockApiUrl + '/marca';

  constructor(private http: HttpClient) {}

  saveBrand(brand: BrandRequest): Observable<void> {
    return this.http.post<void>(`${this.brandAPIUrl}/save-marca`, brand);
  }

  // Obtener marcas con parámetros de paginación y ordenación
  getBrands(query: PageQuery): Observable<Page<BrandResponse>> {
    let params = new HttpParams()
      .set('page', query.page?.toString() || '0')          
      .set('size', query.pageSize?.toString() || '10')     
      .set('order', query.asc ? 'asc' : 'desc');           

    if (query.sortBy) {
      params = params.set('sortBy', query.sortBy);
    }

    console.log('Enviando parámetros a backend:', params.toString()); 

    return this.http.get<Page<BrandResponse>>(
      `${this.brandAPIUrl}/get-brands`,
      { params } 
    );
  }
}