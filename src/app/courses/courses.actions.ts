import { Update } from '@ngrx/entity';
//import { CourseActionTypes, LessonsPageRequested } from './courses.actions';
import { Action } from '@ngrx/store';
import { Course } from './model/course';
import { Lesson } from './model/lesson';
export enum CourseActionTypes  {
    CourseRequested = '[View Course Page] Course Requested',
    CourseLoaded = '[Course API] Course Loaded',
    AllCoureseRequested = '[Courses Home Page] All Courese Requested',
    AllCoureseLoaded = '[Courses API] All Courese Loaded',
    CourseSaved = '[Edit Course Dialog] Course Saved',

    LessonsPageRequested = '[Course Landing Page] Lessons Page Requested',
    LessonsPageLoaded = '[Course API] Lessons Page Loaded',
    LessonsPageCancelled = '[Couse API] Lessons Page Cancelled'
}

export class CourseRequested implements Action {
    readonly type = CourseActionTypes.CourseRequested;

    constructor(public payload: {courseId: number}) {}
}

export class CourseLoaded implements Action {
    readonly type = CourseActionTypes.CourseLoaded;
    constructor(public payload: {course: Course}) {}
}

export class AllCoursesRequested implements Action {
    readonly type = CourseActionTypes.AllCoureseRequested;
}

export class AllCoursesLoaded implements Action {
    readonly type = CourseActionTypes.AllCoureseLoaded;
    constructor(public payload: {courses: Course[]}) {}
}

export class CourseSaved implements Action {
    readonly type = CourseActionTypes.CourseSaved;
    constructor(public payload: {course: Update<Course>}) {}
}

export interface PageQuery {
 pageIndex: number;
 pageSize: number   
}

export class LessonsPageRequested implements Action {
    readonly type = CourseActionTypes.LessonsPageRequested;

    constructor(public payload: {courseId: number, page: PageQuery}){}
}

export class LessonsPageLoaded implements Action {
    readonly type = CourseActionTypes.LessonsPageLoaded;
    constructor(public payload: {lessons: Lesson[]}){}   
}

export class LessonsPageCancelled implements Action {
    readonly type = CourseActionTypes.LessonsPageCancelled;
}

export type CourseActions = CourseRequested | CourseLoaded | AllCoursesLoaded | AllCoursesRequested 
| CourseSaved | LessonsPageRequested | LessonsPageLoaded | LessonsPageCancelled;