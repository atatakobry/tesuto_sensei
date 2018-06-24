import { HomePage, UsersPage, TasksPage } from '../pages';

const routes = [
  {
    to: '/',
    title: 'Home',
    component: HomePage,
    exact: true
  },
  {
    to: '/users',
    title: 'Users',
    component: UsersPage
  },
  {
    to: '/tasks',
    title: 'Tasks',
    component: TasksPage
  }
];

export default routes;
