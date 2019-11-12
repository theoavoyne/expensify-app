import { login, logout } from '../../actions/auth';

test('login() should setup action object correctly', () => {
  const uid = 55;
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('logout() should setup action object correctly', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
