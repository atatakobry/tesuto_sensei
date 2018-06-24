import { HomePage, UsersPage, TasksPage } from '../pages';

const routes = [
  {
    link: '/',
    title: 'Home',
    component: HomePage,
    exact: true
  },
  {
    link: '/users',
    title: 'Users',
    component: UsersPage
  },
  {
    link: '/tasks',
    title: 'Tasks',
    component: TasksPage
  }
];

export default routes;
