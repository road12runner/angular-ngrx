import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { selectAllCoursesLoaded } from './course.selector';
import { Store, select } from '@ngrx/store';
import { CourseRequested, CourseActionTypes, CourseLoaded, AllCoursesRequested, AllCoursesLoaded, LessonsPageRequested, PageQuery, LessonsPageLoaded, LessonsPageCancelled } from './courses.actions';
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, EffectSources } from "@ngrx/effects";
import { mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';
import { AppState } from '../reducers';
import { Lesson } from './model/lesson';

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourse$ = this.actions$.pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested),
        mergeMap(action => this.courseService.findCourseById(action.payload.courseId)),
        map( course => new CourseLoaded({course}))
    );

    @Effect()
    loadAllCourses$ = this.actions$.pipe(
        ofType<AllCoursesRequested>(CourseActionTypes.AllCoureseRequested),
        withLatestFrom(this.store.pipe(select(selectAllCoursesLoaded))),
        filter( ([action, allCoursesLoaded]) => !allCoursesLoaded),
        mergeMap( action => this.courseService.findAllCourses()),
        map( courses => new AllCoursesLoaded({courses}))
    );


    @Effect()
    loadLessonsPage$ = this.actions$.pipe(
        ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested),
        mergeMap( ({payload}) => {
            return this.courseService.findLessons(payload.courseId, payload.page.pageIndex, payload.page.pageSize)
            .pipe(
                catchError( err => {
                    console.log('error loading lessons');
                    //return new LessonsPageCancelled();
                    this.store.dispatch( new LessonsPageCancelled());
                    return of([]);
                })
            )
        }),
        map( (lessons: Lesson[]) => {
            return new LessonsPageLoaded({lessons})
        })
    )

    constructor(private actions$: Actions, private courseService: CoursesService, private store: Store<AppState>){}
}