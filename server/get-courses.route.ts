import { Request, Response } from 'express';
import { COURSES } from './db-data';

export function getAllCourses(req: Request, res: Response) {
  res.status(200).json({ payload: Object.values(COURSES) });
}

export function getCourseById(req: Request, res: Response) {
  const courseId = req.params['id'];

  //Returns an array of values of the enumerable properties of an object
  const courses: any = Object.values(COURSES);

  const course = courses.find((course: any) => course.id == courseId);

  res.status(200).json(course);
}
