import { HomePage, UsersPage, TasksPage, ExercisesPage } from '../pages';

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
  },
  {
    link: '/exercises',
    title: 'Exercises',
    component: ExercisesPage
  }
];

export default routes;
