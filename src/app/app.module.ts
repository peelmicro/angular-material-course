import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule, MatSortModule,
    MatTableModule, MatToolbarModule, MatTabsModule, MatMenuModule, MatButtonModule, MatIconModule, MatCardModule,
    MatSelectModule, MatDatepickerModule, MatDialogModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { CourseComponent } from './course/course.component';
import { CoursesService } from './services/courses.service';
import { CourseResolver } from './services/course.resolver';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        TopMenuComponent,
        CoursesCardListComponent,
        CourseComponent,
        CourseDialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        CoursesService,
        CourseResolver
    ],
    bootstrap: [AppComponent],
    entryComponents: [CourseDialogComponent]
})
export class AppModule {
}
