import { selectBeginnerCourses, selectAdvancedCourses, selectPromoTotal } from './../course.selector';
import { AllCoursesRequested } from './../courses.actions';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {filter, map, tap, withLatestFrom} from "rxjs/operators";
import {CoursesService} from "../services/courses.service";
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import { selectAllCourses } from '../course.selector';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit() {

        this.store.dispatch(new AllCoursesRequested());

        //const courses$ = this.store.pipe(select(selectAllCourses))

        //const courses$ = this.coursesService.findAllCourses();

        // this.beginnerCourses$ = courses$.pipe(
        //   map(courses => courses.filter(course => course.category === 'BEGINNER') )
        // );

        this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
        this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
        this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
        // this.advancedCourses$ = courses$.pipe(
        //     map(courses => courses.filter(course => course.category === 'ADVANCED') )
        // );

        // this.promoTotal$ = courses$.pipe(
        //     map(courses => courses.filter(course => course.promo).length)
        // );

    }

}
