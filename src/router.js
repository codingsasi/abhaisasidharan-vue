import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Blog from './views/Blog.vue'
import Blogs from './views/Blogs.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/blog',
      name: 'blogs',
      component: Blogs,
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: Blog,
    },
    {
      path :'*',
      redirect: '/blog',
    }
  ]
})
