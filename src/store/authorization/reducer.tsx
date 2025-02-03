export type AuthState = { isLoggedIn: boolean };

type AuthAction =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'SET_STATE'; payload: AuthState };

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { isLoggedIn: true };
    case 'LOGOUT':
      return { isLoggedIn: false };
    case 'SET_STATE':
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    default:
      return state;
  }
};
