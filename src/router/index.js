import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/layout/home')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
})

export default router
