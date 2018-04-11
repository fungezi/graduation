import Vue from 'vue'
import App from './App'
import toastr from 'toastr'
import MuseUI from 'muse-ui'
import {table as Etable} from 'element-ui'
import Vodal from 'vodal'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
import router from './router'
import 'toastr/build/toastr.min.css'
import 'muse-ui/dist/muse-ui.css'
import './assets/icon.css'
import 'vodal/fade.css'
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
 
Vue.use(Datetime)

Vue.use(MuseUI)
Vue.use(Etable)
Vue.use(VueLocalStorage)
Vue.prototype.$http = axios
Vue.prototype.toastr = toastr
Vue.component(Vodal.name,Vodal)
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
// Vue.filter('imgUrlPrefix',(value) => {
//   const url = value.substr(7)
//   const prefix = "https://images.weserv.nl/?url="
//   return prefix + url
// })
Vue.filter('castsToString',(casts) => {
  return casts.map(item => {
    return item.name
  })
})

/* eslint-disable no-new */
new Vue({
  created(){
    toastr.success('启动成功!')
  },
  router,
  render: h => h(App)
}).$mount('#app')
