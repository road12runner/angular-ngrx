import { CourseActions, CourseActionTypes } from './../courses.actions';
import { Course } from './../model/course';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
export interface CourseState extends EntityState<Course>{
    allCoursesLoaded: boolean
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: CourseState = adapter.getInitialState({
    allCoursesLoaded: false
});

export function coursesReducer(state = initialState, action: CourseActions) : CourseState{
    switch(action.type) {
        case CourseActionTypes.CourseLoaded:
            return adapter.addOne(action.payload.course, state);
        case CourseActionTypes.AllCoureseLoaded:
            return adapter.addAll(action.payload.courses, {...state, allCoursesLoaded : true});
        case CourseActionTypes.CourseSaved:
            return adapter.updateOne(action.payload.course, state);
        default:
            return state;
    }
}


export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();