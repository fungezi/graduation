import Vue from 'vue'
import Router from 'vue-router'
import List from 'components/List'
import Detail from 'components/Detail'
import Login from 'components/login'
import Index from 'components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },{
      path : '/movie/:id',
      name : 'detail',
      component : Detail
    },{
      path : '/login',
      name : 'login',
      component : Login
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
