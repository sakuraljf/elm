<template>
	<div class="loginboxfu">
		<div class="loginbox">
		<div class="hang"><span class="spans">用户名</span><input type="text" v-model="username" class="span2"/></div>
		<div class="hang"><span class="spans">密码</span><input type="password" v-model="pwd" class="span2"/></div>
		<div @click="login" class="logins">登录</div>	
		</div>
	</div>
</template>

<script>
	export default{
		name:'login',
		data(){
			return {
				username:'',
				pwd:''
			}
		},
		methods:{
			login(){
				var that=this;
				var request=window.indexedDB.open('user',1.0);
				request.onsuccess=function(e){
					console.log("创建或打开数据库成功");
					var db=e.target.result;
					var transaction=db.transaction(["userbiao"],'readwrite');
					var store=transaction.objectStore('userbiao');
					var dataRequest=store.get(that.username);
					dataRequest.onsuccess=function(){
						if(this.result==undefined){
							console.log("没有符合条件的数据");
						}else{
							if(this.result.pwd==that.pwd){
								console.log("密码和用户名都正确");
								//将全局的用户改为登录yonghu
								// that.globle.username=that.username;
								sessionStorage.setItem("username",that.username)
								that.$router.back();
							}else{
								console.log("密码错误");
							}
						}
					}
				}
			}
		}
	}
</script>

<style>
	.loginboxfu{
		display: flex;
		height: 600px;
		background-color: rgb(241,243,244);
	}
	.loginbox{
		width: 80%;
		height:190px;
		margin: auto;
		align-items: center;
		background-color: white;
		border-radius: 10px;
	}
	.logindiv{
		width: 80%;
		height:400px;
		background-color: white;
		margin: auto;
		align-items: center;
		border-radius: 8px;
	}
	.logins{
		width: 100%;
		height:50px;
		background-color: rgb(53,193,240);
		color: white;
		text-align: center;
		line-height: 50px;
		font-size: 20px;
	}
</style>
