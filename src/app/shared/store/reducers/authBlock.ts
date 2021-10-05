import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export const signUpEnter = createAction('[AUTH] sign up enter');
export const logInEnter = createAction('[AUTH] log in enter');
export const signUpLeave = createAction('[AUTH] sign up leave');
export const logInLeave = createAction('[AUTH] log in leave');

export interface AuthBlockState {
  signUpBlock: boolean;
  logInBlock: boolean;
}

export const initialState: AuthBlockState = {
  signUpBlock: false,
  logInBlock: false,
};

export const authBlockReducer = createReducer(
  initialState,
  on(signUpEnter, (state) => ({
    ...state,
    signUpBlock: true,
  })),
  on(logInEnter, (state) => ({
    ...state,
    logInBlock: true,
  })),
  on(signUpLeave, (state) => ({
    ...state,
    signUpBlock: false,
  })),
  on(logInLeave, (state) => ({
    ...state,
    logInBlock: false,
  }))
);

export const featureSelector =
  createFeatureSelector<AuthBlockState>('authBlock');

export const signUpBlock = createSelector(
  featureSelector,
  (state) => state.signUpBlock
);

export const logInBlock = createSelector(
  featureSelector,
  (state) => state.logInBlock
);
