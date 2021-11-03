<template>
	<div class="maindetail">
		<img :src="imgs" class="detailimg"/>
		<img src="../assets/fan.png" class="fanhui" @click="fanhui"/>
		<div class="boxdetail">
		<div class="chanames">{{cha.name}}</div>
		<div class="yueshou">月售: {{cha.yueshou}}</div>
		<div class="price">￥{{cha.price}}</div>
		<button @click="jia()" class="jiaru">+加入购物车</button>
		</div>
		<div class="miaoshu">
			<div class="titlemiaoshu">商品详情:</div>
		{{cha.miaoshu}}</div>	
	</div>
</template>

<script>
	
	export default{
		name:"detail",
		data(){
			return {
				cha:{},
				imgs:''
			}
		},
    mounted() {
			
    		this.$nextTick(function () {
					var that=this;
					var request=window.indexedDB.open('cha',7.0);
					request.onerror=function(){
						console.log("数据库创建或打开失败")
					};
					request.onsuccess=function(e){
						console.log("创建数据库或打开成功");
						var db=e.target.result;
						var transaction=db.transaction(["chalist"],"readwrite");
						var store=transaction.objectStore("chalist");
						var dataRequest=store.get(parseInt(that.$route.params.id));
						dataRequest.onsuccess=function(){
		        that.cha=this.result;
						var img=require("../assets/listimg/"+this.result.id+".png")
						that.imgs=img;
						}
					}
				})
    },
		methods:{
			
			jia(){
				if(sessionStorage.getItem("username")==null){
					alert("请先登录哦");
				}else{
					var that=this;
									alert("加入购物车成功");
					var request=window.indexedDB.open("cha",7.0);
					request.onsuccess=function(e){
									 console.log("打开数据库成功");
									 var db=e.target.result;
									 var transaction=db.transaction(["gwc"],"readwrite");
									 var store=transaction.objectStore("gwc");
									 var dataRequest=store.get(parseInt(that.$route.params.id));
									 dataRequest.onsuccess=function(){
										 if(this.result==undefined){
											 console.log("没有相关数据");
											 dataRequest=store.add(that.cha);
											 dataRequest.onsuccess=function(){
												 console.log("加入数据库成功");
											 }
										 }else{
											 var a=this.result;
											 a.shuliang=a.shuliang+1;
											 dataRequest=store.put(a);
											 dataRequest.onsuccess=function(){
												 console.log("数量加一")
											 }
										 }
									 }
					}
				}
			
			},
			fanhui(){
			this.$router.back();
			}
		}
	}
</script>

<style>
	.detailimg{
		width: 100%;
	}
	.boxdetail{
		width: 90%;
		margin: auto;
		background-color: white;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 8px;
		position: relative;
	}
	.maindetail{
		background-color: rgb(241,243,244);
		
	}
	.miaoshu{
		width: 90%;
		margin: auto;
		margin-top: 28px;
		background-color: white;
		border-radius: 10px;
	}
	.chanames{
		font-size: 20px;
		margin-bottom: 10px;
		margin-left: 5px;
	}
	.yueshou{
		font-size: 12px;
		color: silver;
		margin-bottom: 10px;
		margin-left: 5px;
	}
	.price{
		color: red;
		font-size: 22px;
		float: left;
		margin-bottom: 10px;
		margin-left: 5px;
	}
	.jiaru{
		float: right;
		margin-bottom: 10px;
	  margin-right: 8px;
		display: inline-block;
		width: 105px;
		height:30px;
		border-radius:15px ;
		border: 1px solid rgb(53,193,240);
		background-color: rgb(53,193,240);
		color: white;
	}
	.titlemiaoshu{
		margin-bottom: 10px;
		font-size:20px;
	}
	.fanhui{
		width: 30px;
		height:30px;
		z-index: 3;
		position: absolute;
		top:10px;
		left: 10px;
	}
</style>
