import {
  HomePage,
  ExercisesPage,
  ExercisePage,
  TestsPage,
  TestPage
} from '../pages';

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
    path: '/exercises/:typeUid/:id',
    title: 'Exercise',
    component: ExercisePage,
    exact: true,
    hidden: true
  },

  {
    path: '/tests',
    title: 'Tests',
    icon: 'file-text',
    component: TestsPage,
    exact: true
  },
  {
    path: '/tests/:id',
    title: 'Test',
    component: TestPage,
    exact: true,
    hidden: true
  }
];

export default routes;
