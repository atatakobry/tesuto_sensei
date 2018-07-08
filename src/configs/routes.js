import { HomePage, ExercisesPage, ExercisePage } from '../pages';

const routes = [
  {
    path: '/',
    title: 'Home',
    icon: 'home',
    component: HomePage,
    exact: true
  },

  {
    path: '/exercises',
    title: 'Exercises',
    icon: 'bars',
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
