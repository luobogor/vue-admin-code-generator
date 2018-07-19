import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Login = () => import('pages/Login');
const Manage = () => import('pages/Manage');

// @{code-generator-anchor__router-import-component}

const routes = [
  {
    path: '/',
    component: Login,
  }, {
    path: '/manage',
    name: 'manage',
    component: Manage,
    children: [
       // @{code-generator-anchor__router-config-path}
    ],
  },
];


const index = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
});

index.beforeEach((to, from, next) => {
  next();
});
export default index;
