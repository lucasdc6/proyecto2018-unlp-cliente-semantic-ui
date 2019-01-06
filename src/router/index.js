import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import QueryList from '@/components/Queries/List';
import FormQuery from '@/components/Queries/Form';

import '@/assets/styles.css';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/consultas',
      name: 'QueryList',
      component: QueryList,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/consultas/new',
      name: 'NewQuery',
      component: FormQuery,
      props: {
        form: 'new',
      },
    },
    {
      path: '/consultas/:id/edit',
      name: 'EditQuery',
      component: FormQuery,
      props: {
        form: 'edit',
      },
    },
  ],
});
