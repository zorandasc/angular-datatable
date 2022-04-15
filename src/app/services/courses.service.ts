import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get(`/api/courses`)
      .pipe(map((res: any) => res['payload']));
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`api/courses/${courseId}`);
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('pageNumber', '0')
          .set('pageSize', '1000'),
      })
      .pipe(map((res: any) => res['payload']));
  }

  findLessons(
    courseId: number,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http
      .get('/api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res: any) => res['payload']));
  }
}
