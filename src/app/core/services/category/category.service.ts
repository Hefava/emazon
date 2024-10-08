import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageQuery } from '@interfaces/services/queries';
import { environment } from 'src/environments/environment';
import { CategoryRequest, CategoryResponse } from '@interfaces/models/category-request.model';
import { Page } from '@interfaces/services/page';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryAPIUrl = environment.stockApiUrl + '/categoria';

  constructor(private http: HttpClient) {}

  saveCategory(category: CategoryRequest): Observable<void> {
    return this.http.post<void>(`${this.categoryAPIUrl}/save-category`, category);
  }

  getCategories(query: PageQuery): Observable<Page<CategoryResponse>> {
    let params = new HttpParams()
      .set('page', query.page?.toString() || '0')
      .set('size', query.pageSize?.toString() || '10')
      .set('order', query.asc ? 'asc' : 'desc');

    if (query.sortBy) {
      params = params.set('sortBy', query.sortBy);
    }

    return this.http.get<Page<CategoryResponse>>(
      `${this.categoryAPIUrl}/get-categories`,
      { params }
    );
  }
}