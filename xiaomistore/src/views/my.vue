<template>
	<div class="fu">
		<div v-if="islogin" class="mybox2">
			欢迎您，尊敬的{{username}}
		</div>
		<div v-else class="mybox1">
    <router-link to="/login" class="ljf">登录</router-link>
    <router-link to="/resiger" class="ljf">注册</router-link>
    <router-view></router-view>			
		</div>
	</div>
</template>

<script>
	export default{
		name:'my',
		data(){
			return{
				islogin:false,
				username:''
			}
		},
		methods:{
			getuername(){
				if(sessionStorage.getItem("username")!=null){
					this.username=sessionStorage.getItem("username");
					this.islogin=true;
				}
			}
		},
		beforeRouteEnter(to,from,next) {
			next(vm=>vm.getuername())
		}
	}
</script>

<style>
	.fu{
		display: flex;
		height: 400px;
	}
	.ljf{
		text-decoration: none;
		color:rgb(53,193,240);
		margin-left: 10px;
	}
	.mybox1{
		margin: auto;
		align-items:center;
	}
	.mybox2{
	 height: 400px;
	 line-height: 400px;
	 margin: auto;
	}
</style>
