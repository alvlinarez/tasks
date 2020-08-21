// types: 1 -> Protected routes || 2 -> Auth routes
export const routes = [
  {
    path: '/',
    type: 1
  },
  {
    path: 'projects',
    type: 1
  },
  {
    path: '/signin',
    type: 2
  },
  {
    path: '/signup',
    type: 2
  }
];
