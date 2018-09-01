import {Request, Response} from 'express';
import {LESSONS} from './db-data';
import {setTimeout} from 'timers';



export function searchLessons(req: Request, res: Response) {

    const queryParams = req.query;
    // parseInt --> To avoid 'parseInt missing radix parameter' error,
    // as explained in https://stackoverflow.com/questions/17681843/lint-warning-parseint-missing-radix-parameter
    // we have to add 10 as the value for the second parameter
    const courseId = queryParams.courseId,
          filter = queryParams.filter || '',
          sortOrder = queryParams.sortOrder,
          pageNumber = parseInt(queryParams.pageNumber, 10) || 0,
          pageSize = parseInt(queryParams.pageSize, 10);

    let lessons = Object.values(LESSONS).filter(lesson => lesson.courseId === courseId).sort((l1, l2) => l1.id - l2.id);

    if (filter) {
       lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder === 'desc') {
        lessons = lessons.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({payload: lessonsPage});
    }, 1000);


}
