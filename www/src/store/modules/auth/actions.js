export function authenticated(authData) {
  return {
    type: '@auth/authenticate',
    payload: authData,
  };
}

export function logout() {
  return {
    type: '@auth/logout',
  };
}
