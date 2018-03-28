import Vue from 'vue'
import Router from 'vue-router'
import List from 'components/List'
import Detail from 'components/Detail'
import Login from 'components/login'
import Index from 'components/Index'
import Apply from 'components/apply'
import ApplyManage from 'components/applyManage'
import Cinema from 'components/cinema'
import Register from 'components/register'
import User from 'components/user'

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
      path: '*',
      redirect : '/'
    }
  ]
})
