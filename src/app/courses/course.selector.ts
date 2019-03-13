import { PageQuery } from './courses.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CourseState } from './services/course.reducer';

import * as fromCourse from './services/course.reducer';
import * as fromLessons from './services/lessons.reducer';

import { LessonsState } from './services/lessons.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('courses');
export const selectLessonsState = createFeatureSelector<LessonsState>('lessons');

export const selectCourseById = (courseId: number) => createSelector(selectCourseState, courseState => courseState.entities[courseId]);

export const selectAllCourses = createSelector(selectCourseState, fromCourse.selectAll);

export const selectBeginnerCourses = createSelector(selectAllCourses, courses => courses.filter( course => course.category === 'BEGINNER'));
export const selectAdvancedCourses = createSelector(selectAllCourses, courses => courses.filter( course => course.category === 'ADVANCED'));
export const selectPromoTotal = createSelector(selectAllCourses, courses => courses.filter(course => course.promo).length);

export const selectAllCoursesLoaded = createSelector(selectCourseState, state => state.allCoursesLoaded);

export const selectAllLessons = createSelector(
    selectLessonsState,
    fromLessons.selectAll
);

export const selectLessonsPage = (courseId: number, page: PageQuery) => createSelector(
    selectAllLessons,
    allLessons => {
        const start = page.pageIndex * page.pageSize;
        const end = start + page.pageSize
        
        return allLessons.filter( lesson => lesson.courseId === courseId).slice(start , end);
    }
);

export const selectLessonsLoading = createSelector(
    selectLessonsState,
    lessonState => lessonState.loading
)