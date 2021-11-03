import Vue from 'vue'
import VueRouter from 'vue-router'
import titles from "../views/titles.vue"
import my from "../views/my.vue"
import goodsall from "../views/goodsall.vue"
import shopping from "../views/shopping.vue"
import detail from "../views/detail.vue"
import resiger from '../views/resiger.vue'
import login from '../views/login.vue'
Vue.use(VueRouter);

const routes=[
	{
		path:'',
		//重定向，页面的path为'',的时候重定向
		redirect:'/my'
	},
	{
		path:"/titles",
		component:titles
	},
	{
		path:"/my",
		component:my
	},{
		path:"/goodsall",
		component:goodsall
	},
		{
			path:"/shopping",
			component:shopping
		},
	{
	path:"/detail/:id",
	component:detail	
	},{
		path:"/login",
		component:login,
	},{
		path:'/resiger',
		component:resiger
	}
]

const router=new VueRouter({
	// 配置路由与组件的应用关系
	routes:routes,
	mode:'history',
	linkActiveClass:'active'
})
export default router