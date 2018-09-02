import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
// import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// import { Lesson } from '../model/lesson';
import { LessonsDatasource } from '../services/lessons.datasource';
import { debounce, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
// import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;
  // dataSource = new MatTableDataSource<Lesson>();
  dataSource: LessonsDatasource;
  displayedColumns: string[] = ['seqNo', 'description', 'duration'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    // this.coursesService.findLessons(this.course.id)
    //   .subscribe((lesssons: Lesson[]) => this.dataSource.data = lesssons);
    this.dataSource = new LessonsDatasource(this.coursesService);

    this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(
      () => this.paginator.pageIndex = 0
    );

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      )
      .subscribe();
    // this.paginator.page.pipe(
    //   tap(() => this.dataSource.loadLessons(this.course.id, '', 'asc',
    //     this.paginator.pageIndex, this.paginator.pageSize))
    // )
    // .subscribe();
    merge(this.sort.sortChange, this.paginator.page).subscribe(
      () => this.loadLessonsPage()
    );
  }

  // searchLessons(search = '') {
  //   this.dataSource.filter = search.toLowerCase().trim();
  // }

  loadLessonsPage() {
    this.dataSource.loadLessons(
        this.course.id,
        this.input.nativeElement.value,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }
}
