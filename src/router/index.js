import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/layout')
const Login = () => import('@/views/login')
const Home = () => import('@/views/secound/home.vue')
const Find = () => import('@/views/secound/find.vue')
const Consult = () => import('@/views/secound/consult.vue')
const My = () => import('@/views/secound/my.vue')
const MyCollect = () => import('@/views/myCollect')
const MyRent = () => import('@/views/myRent')
const City = () => import('@/views/city')
const Map = () => import('@/views/map')
const Detail = () => import('@/views/detail')
const Add = () => import('@/views/add')
const Search = () => import('@/views/search')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'find',
        name: 'find',
        component: Find
      },
      {
        path: 'consult',
        name: 'consult',
        component: Consult
      },
      {
        path: 'my',
        name: 'my',
        component: My
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mycollect',
    name: 'mycollect',
    component: MyCollect
  },
  {
    path: '/myrent',
    name: 'myrent',
    component: MyRent
  },
  {
    path: '/city',
    name: 'city',
    component: City
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
    props: true
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
