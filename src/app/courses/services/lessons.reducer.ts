import { LessonsState } from './lessons.reducer';
import { CourseActions, CourseActionTypes } from './../courses.actions';
import { Lesson } from './../model/lesson';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionsSubject } from '../../../../node_modules/@ngrx/store';


export interface LessonsState extends EntityState<Lesson> {
    loading: boolean
}

const sortByCourseAndSeqNo = (l1: Lesson, l2:  Lesson) => {
    const compare = l1.courseId -  l2.courseId;
    if (compare != 0) {
        return compare;
    } else {
        return l1.seqNo - l2.seqNo;
    }

};

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>(
    {sortComparer: sortByCourseAndSeqNo}
);

const initialState = adapter.getInitialState({
    loading: false
});

export const lessonsReducer = (state = initialState, action : CourseActions) : LessonsState => {
    switch (action.type) {
        case CourseActionTypes.LessonsPageRequested:
            return {...state, loading : true};
            case CourseActionTypes.LessonsPageCancelled:
            return {...state, loading : false};
        case CourseActionTypes.LessonsPageLoaded:
            return adapter.addMany(action.payload.lessons, {...state, loading: false});
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