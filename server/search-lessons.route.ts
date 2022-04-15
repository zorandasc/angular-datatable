import { Request, Response } from 'express';
import { LESSONS } from './db-data';
import { setTimeout } from 'timers';

export function searchLessons(req: Request, res: Response) {
  const queryParams: any = req.query;

  const courseId = queryParams.courseId;
  const filter = queryParams.filter || '';
  const sortOrder = queryParams.sortOrder;
  const pageNumber = parseInt(queryParams.pageNumber) || 0;
  const pageSize = parseInt(queryParams.pageSize);
  
  //filter lessons by course id
  let lessons = Object.values(LESSONS)
    .filter((lesson) => lesson.courseId == courseId)
    .sort((l1, l2) => l1.id - l2.id);

  //filter by term
  if (filter) {
    lessons = lessons.filter(
      (lesson) =>
        lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >=
        0
    );
  }

  //sorting
  if (sortOrder == 'desc') {
    lessons = lessons.reverse();
  }

  //paginacija
  const initialPos = pageNumber * pageSize;
  const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

  setTimeout(() => {
    res.status(200).json({ payload: lessonsPage });
  }, 1000);
}
