import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/dashboard/home/home.component';
import { CategoriesComponent } from './components/pages/dashboard/categories/categories.component';
import { CategoryFormComponent } from './components/molecules/category-form/category-form.component';  // Asegúrate de importar tu CategoryFormComponent

const routes: Routes = [
    {
        path: 'login',
        title: 'Emazon',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        title: 'Emazon',
        component: CategoryFormComponent,  
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'categories',
                title: 'Categories',
                component: CategoriesComponent,
            },
        ],
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}