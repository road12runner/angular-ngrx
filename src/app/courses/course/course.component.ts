import { PageQuery } from './../courses.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../reducers/index';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {Observable, merge, fromEvent} from "rxjs";
import {LessonsDataSource} from "../services/lessons.datasource";
import { toPublicName } from '../../../../node_modules/@angular/compiler/src/i18n/serializers/xmb';
import { selectLessonsLoading } from '../course.selector';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    dataSource: LessonsDataSource;

    displayedColumns= ["seqNo", "description", "duration"];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    loading$: Observable<boolean>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {

    }

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];
        this.dataSource = new LessonsDataSource(this.store);

        const initialPage: PageQuery = {
            pageIndex: 0, 
            pageSize: 3
        }


        this.dataSource.loadLessons(this.course.id, initialPage);

        this.loading$ = this.store.pipe(select(selectLessonsLoading));

    }

    ngAfterViewInit() {
        this.paginator.page.pipe(
            tap(() => this.loadLessonsPage())
        ).subscribe();

    }

    loadLessonsPage() {
        const newPage: PageQuery = {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize
        }

        this.dataSource.loadLessons(this.course.id, newPage);
    }


}
