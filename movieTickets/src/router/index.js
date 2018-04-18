import Vue from 'vue'
import Router from 'vue-router'
import User from 'components/user'
import List from 'components/List'
import Login from 'components/login'
import Index from 'components/Index'
import Apply from 'components/apply'
import Cinema from 'components/cinema'
import Detail from 'components/Detail'
import Register from 'components/register'
import ApplyManage from 'components/applyManage'
import OrderDetail from 'components/orderDetail'
import CinemaDetail from 'components/CinemaDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },{
      path : '/detail/:id',
      name : 'detail',
      component : Detail
    },{
      path : '/login',
      name : 'login',
      component : Login
    },
    {
      path : '/apply',
      name : 'apply',
      component : Apply
    },
    {
      path : '/applyManage',
      name : 'applyManage',
      component : ApplyManage
    },
    {
      path : '/cinema',
      name : 'cinema',
      component : Cinema
    },
    {
      path : '/user',
      name : 'user',
      component : User
    },
    {
      path : '/cinemaDetail/:cinemaId',
      name : 'cinemaDetail',
      component : CinemaDetail
    },
    {
      path : '/register',
      name : 'register',
      component : Register
    },
    {
      path : '/index',
      name : 'index',
      component : Index
    },
    {
      path : '/order',
      name : 'order',
      component : OrderDetail
    },
    {
      path: '*',
      redirect : '/'
    }
  ]
})
