import VueRouter from 'vue-router'
import Vue from "vue"
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Index from '../views/Index.vue'
import Problems from '../views/problem/Problems.vue'
import ProblemDetail from "../views/problem/ProblemDetail.vue";
import ProblemPost from "../views/problem/ProblemPost.vue";
import ProblemList from "../views/problem/ProblemList.vue";
import ContestDetail from "../views/contest/ContestDetail.vue"
import Contests from '../views/contest/Contests.vue'
import ContestPost from "../views/contest/ContestPost.vue";
import ContestList from "../views/contest/ContestList.vue";
import Forum from '../views/forum/Forum.vue'
import ForumDetail from '../views/forum/ForumDetail.vue'
import ForumPost from "../views/forum/ForumPost.vue"
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import SRegister from "../views/auth/SRegister.vue";
import Account from "../views/account/Account.vue"
import VerifyEmail from "../views/auth/VerifyEmail.vue"
import Forget from "../views/auth/Forget.vue"

import Test from '../views/test.vue'


const routes = [
  {
    path: '/test',
    name: 'Test',
    meta: {
      index: 0
    },
    component: Test
  },
  {
    path: '/',
    name: 'Index',
    meta: {
      index: 1,
    },
    component: Index
  },
  {
    path: '/problems',
    name: 'Problems',
    meta: {
      index: 2,
    },
    component: Problems
  },
  {
    path: '/problems/:id',
    name: 'Problem',
    meta: {
      index: 3,
    },
    component: ProblemDetail
  },
  {
    path: '/contests',
    name: 'Contests',
    meta: {
      index: 4,
    },
    component: Contests
  },
  {
    path: '/contests/:id',
    name: 'Contest',
    meta: {
      index: 5,
    },
    component: ContestDetail
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      index: 6,
    },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      index: 7,
    },
    component: Register
  },
  {
    path: '/sregister',
    name: 'SRegister',
    meta: {
      index: 8,
    },
    component: SRegister
  },
  {
    path: '/account',
    name: 'Account',
    meta: {
      index: 9,
    },
    component: Account
  },
  {
    path: '/verify_email',
    name: 'VerifyEmail',
    meta: {
      index: 10,
    },
    component: VerifyEmail
  },
  {
    path: '/forget',
    name: 'Forget',
    meta: {
      index: 11,
    },
    component: Forget
  },
  {
    path: '/forum',
    name: 'Forum',
    meta: {
      index: 12,
    },
    component: Forum
  },
  {
    path: '/forum/:id',
    name: 'ForumDetail',
    meta: {
      index: 13,
    },
    component: ForumDetail
  },
  {
    path: '/forum_post',
    name: 'ForumPost',
    meta: {
      index: 14,
    },
    component: ForumPost
  },
  {
    path: '/contest_post',
    name: 'ContestPost',
    meta: {
      index: 15,
    },
    component: ContestPost
  },
  {
    path: '/problem_post',
    name: 'ProblemPost',
    meta: {
      index: 16,
    },
    component: ProblemPost
  },
  {
    path: '/contest_list',
    name: 'ContestList',
    meta: {
      index: 17,
    },
    component: ContestList
  },
  {
    path: '/problem_list',
    name: 'ProblemList',
    meta: {
      index: 18,
    },
    component: ProblemList
  },
  {
    path: "/:catchAll(.*)",
    name: "/404",
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
