<template>
	<div class="resigerfu">
  <div class="resigerdiv">
  <div class="hang"><span class="spans">用户名</span><input type="text" v-model="username" class="span2"/></div>
  <div class="hang"><span class="spans">密码</span><input type="password" v-model="pwd" class="span2"/></div>
  <div class="hang"><span class="spans">电话</span><input type="text" v-model="tel" class="span2"/></div>
  <div class="hang"><span class="spans">邮箱</span><input type="email" v-model="em" class="span2"/></div>
  <div class="hang"><span class="spans">收货地址</span><input type="text" v-model="dizhi" class="span2"/></div>
  <div @click="zhuce" class="zhuce">注册</div>
  </div>		
	</div>

</template>

<script>
	export default{
		name:"resiger",
		data(){
			return{
				username:'',
				pwd:'',
				tel:'',
				em:'',
				dizhi:''
			}
		},
		methods:{
			zhuce(){
				console.log('注册成功');
				var data={
					username:this.username,
					pwd:this.pwd,
					tel:this.tel,
					em:this.em,
					dizhi:this.dizhi
				}
				console.log(this.username,this.pwd,this.tel,this.dizhi);
				var request=window.indexedDB.open('user',1.0);
				request.onsuccess=function(e){
					var db=e.target.result;
					var transaction=db.transaction(["userbiao"],"readwrite");
						var store=transaction.objectStore("userbiao");
						var add=store.add(data);
						add.onsuccess=function(){
							console.log("数据插入成功");
						};
						add.onerror=function(){
							console.log("数据插入失败");
						}
				}
				this.$router.back();
			}
		}
	}
</script>

<style>
	*{
		padding: 0px;
		margin: 0px;
	}
	.resigerdiv{
		width: 80%;
		height:400px;
		background-color: white;
		margin: auto;
		align-items: center;
		border-radius: 8px;
	}
	.resigerfu{
		display: flex;
		width: 100%;
		height: 600px;
		background-color: rgb(241,243,244);
	}
	.hang{
		margin-bottom: 20px;
		height:50px;
	}
	.spans{
		display: inline-block;
		width:30%;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	.span2{
		display: inline-block;
		width:68%;
		height: 45px;
		border: 1px solid rgb(241,243,244);
	}
	.zhuce{
		width: 100%;
		height:50px;
		background-color: rgb(53,193,240);
		color: white;
		text-align: center;
		line-height: 50px;
		font-size: 20px;
	}
</style>
