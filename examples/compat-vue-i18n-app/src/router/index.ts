import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/Layout.vue';

// Eager load Home (initial landing page)
import Home from '../pages/Home.vue';

// Lazy load other routes to create separate bundles per page
const About = () => import('../pages/About.vue');
const Blog = () => import('../pages/Blog.vue');
const Careers = () => import('../pages/Careers.vue');
const Contact = () => import('../pages/Contact.vue');
const FAQ = () => import('../pages/FAQ.vue');
const Pricing = () => import('../pages/Pricing.vue');
const Products = () => import('../pages/Products.vue');
const Settings = () => import('../pages/Settings.vue');
const Team = () => import('../pages/Team.vue');
const NotFound = () => import('../pages/NotFound.vue');

const routes = [
  {
    path: '/',
    redirect: '/en',
  },
  {
    path: '/:locale',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'blog', component: Blog },
      { path: 'careers', component: Careers },
      { path: 'contact', component: Contact },
      { path: 'faq', component: FAQ },
      { path: 'pricing', component: Pricing },
      { path: 'products', component: Products },
      { path: 'settings', component: Settings },
      { path: 'team', component: Team },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
