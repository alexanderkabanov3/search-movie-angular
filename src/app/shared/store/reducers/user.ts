import {
  createAction,
  createReducer,
  props,
  on,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

export const userEnterAction = createAction(
  '[AUTH] register',
  props<{username: string | null}>()
);

export const userLeaveAction = createAction('[AUTH] leave');

export interface UserState {
  username: string | null;
  isLoggedIn: boolean;
}

export const initialState: UserState = {
  username: localStorage.getItem('userName'),
  isLoggedIn: JSON.parse(localStorage.getItem('loggedIn')),
};

export const userReducer = createReducer(
  initialState,
  on(userEnterAction, (state, action) => ({
    ...state,
    username: action.username,
    isLoggedIn: true,
  })),
  on(userLeaveAction, (state) => ({
    ...state,
    username: null,
    isLoggedIn: false,
  }))
);

export const featureSelector = createFeatureSelector<UserState>('user');

export const usernameSelector = createSelector(
  featureSelector,
  (state) => state.username
);

export const loggedInSelector = createSelector(
  featureSelector,
  (state) => state.isLoggedIn
);
