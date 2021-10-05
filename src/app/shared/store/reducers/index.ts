import {ActionReducerMap} from '@ngrx/store';

import {userReducer, UserState} from './user';
import {AuthBlockState, authBlockReducer} from './authBlock';
import {trailerReducer, TrailerState} from './trailer';

export interface State {
  user: UserState;
  authBlock: AuthBlockState;
  trailer: TrailerState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  authBlock: authBlockReducer,
  trailer: trailerReducer,
};
