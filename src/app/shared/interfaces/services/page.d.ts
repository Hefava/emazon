export interface Page<T> {
	content: T[]; // Array de items de tipo genérico T (en tu caso, será CategoryResponse)
	page: number; // Número de la página actual
	pageSize: number; // Tamaño de la página
	totalPages: number; // Número total de páginas
	totalCount: number; // Total de elementos
  }
  