import { HomePage, UsersPage, ExercisesPage, ExercisePage } from '../pages';

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
    component: UsersPage,
    exact: true
  },

  {
    link: '/exercises',
    title: 'Exercises',
    component: ExercisesPage,
    exact: true
  },
  {
    link: '/exercises/:type',
    title: 'Exercise',
    component: ExercisePage,
    hidden: true
  }
];

export default routes;
