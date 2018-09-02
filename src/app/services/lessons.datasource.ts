import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Lesson } from '../model/lesson';
import { CoursesService } from './courses.service';

export class LessonsDatasource implements DataSource<Lesson> {

  private lessonSubject = new BehaviorSubject<Lesson[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private coursesService: CoursesService
  ) {}

  loadLessons(
    courseId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);
    this.coursesService.findLessons(courseId, filter, sortDirection, pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((lessons: Lesson[]) => this.lessonSubject.next(lessons));
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonSubject.complete();
    this.loadingSubject.complete();
  }
}
