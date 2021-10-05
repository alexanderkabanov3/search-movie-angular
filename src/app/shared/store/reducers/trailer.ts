import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export const trailerOpenAction = createAction('[TRAILER] open');

export const trailerLeaveAction = createAction('[TRAILER] close');
export const trailerDoesNotExist = createAction('[TRAILER] does not exist');
export const dataReceived = createAction('[TRAILER] data received');
export const dataLeft = createAction('[TRAILER] data left');

export interface TrailerState {
  open: boolean;
  trailerExist: boolean;
  dataReceived: boolean;
}

export const initialState: TrailerState = {
  open: false,
  trailerExist: true,
  dataReceived: false,
};

export const trailerReducer = createReducer(
  initialState,
  on(trailerOpenAction, (state) => ({
    ...state,
    open: true,
  })),
  on(trailerLeaveAction, (state) => ({
    ...state,
    open: false,
    trailerExist: true,
  })),
  on(trailerDoesNotExist, (state) => ({
    ...state,
    trailerExist: false,
  })),
  on(dataReceived, (state) => ({
    ...state,
    dataReceived: true,
  })),
  on(dataLeft, (state) => ({
    ...state,
    dataReceived: false,
  }))
);

export const featureSelector = createFeatureSelector<TrailerState>('trailer');
export const trailerStream = createSelector(featureSelector, (state) => {
  return {
    trailerExist: state.trailerExist,
    open: state.open,
  };
});
export const dataReceivedStream = createSelector(
  featureSelector,
  (state) => state.dataReceived
);
