import produce from 'immer';

import api from '~/services/api';

const INITIAL_STATE = {
  isAuthenticated: false,
  token: null,
};

export default function auth(state = INITIAL_STATE, action = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/authenticate':
        draft.isAuthenticated = true;
        draft.token = action.payload.token;

        api.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
        break;
      case 'persist/REHYDRATE':
        if (action.payload) {
          draft.isAuthenticated = action.payload.auth.isAuthenticated;
          draft.token = action.payload.auth.token;

          api.defaults.headers.common.Authorization = `Bearer ${action.payload.auth.token}`;
        }
        break;
      case '@auth/logout':
        draft.isAuthenticated = false;
        draft.token = null;
        break;
      default:
    }
  });
}
