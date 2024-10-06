import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryRequest } from './category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8090/categoria'; 

  constructor(private http: HttpClient) {}

  saveCategory(category: CategoryRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save-category`, category);
  }
}