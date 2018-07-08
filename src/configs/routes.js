import { HomePage, ExercisesPage, ExercisePage } from '../pages';

const routes = [
  {
    path: '/',
    title: 'Home',
    component: HomePage,
    exact: true
  },

  {
    path: '/exercises',
    title: 'Exercises',
    component: ExercisesPage,
    exact: true
  },
  {
    path: '/exercises/:id',
    title: 'Exercise',
    component: ExercisePage,
    exact: true,
    hidden: true
  }
];

export default routes;
