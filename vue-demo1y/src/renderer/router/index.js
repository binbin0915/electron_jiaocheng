import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path:"/books",
      name:"books",
      component:require('@/components/Books').default

    },
    {
      path:"/bookDetail",
      name:"bookDetail",
      component:require('@/components/BookDetail').default

    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
