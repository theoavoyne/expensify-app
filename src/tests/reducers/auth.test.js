import authReducer from '../../reducers/auth';

test('LOGIN should set uid', () => {
  const action = { type: 'LOGIN', uid: '55' };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test('LOGOUT should clear uid', () => {
  const action = { type: 'LOGOUT' };
  const state = authReducer({ uid: 55 }, action);
  expect(state.uid).toBeFalsy();
});
