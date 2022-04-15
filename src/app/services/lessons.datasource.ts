import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesService } from './courses.service';

export class LessonsDataSource implements DataSource<Lesson> {
  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private coursesServic: CoursesService) {}

  loadLessons(
    courseId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
   
    this.loadingSubject.next(true);

    this.coursesServic
      .findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((lessons) => this.lessonsSubject.next(lessons));
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Lesson[]> {
    console.log('Connecting data source');
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }
}
