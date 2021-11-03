<template>
	<div>
		<ul>
			<li v-for="(gwc,i) in gwclist" :key="gwc.id">
				<div class="detailbox1">
				<img :src="imgs[i]" class="gwcimg"/>
				<div class="detailname">{{gwc.name}}</div>
				<div class="detailprice">{{gwc.price}}</div>	
				</div>
        <div class="detailbox2">
					<div  @click="jian(gwc.id)" class="jians">-</div>
					<div class="shuliang">{{gwc.shuliang}}</div>
					<div @click="jia(gwc.id)" class="jias">+</div>	
				</div>
			</li>
		</ul>
		<br />
		<!-- <img src="../assets/gwcdetail.png" class="gwclogo"/> -->
		<div class="total gaibian">订单总额:{{gettotal}}</div>
		<div style="height: 150px;"></div>
		<button @click="zhifu" class="gaibain zhi">立即支付{{gettotal}}</button>
		<div style="height: 100px;"></div>
	</div>
</template>

<script>
	export default{
		name:"shopping",
		data(){
			return {
				gwclist:[],
				imgs:[],
				
			}
			},
			computed:{
				gettotal(){
					var total=0;
					for(var i=0;i<this.gwclist.length;i++){
						total+=this.gwclist[i].shuliang*this.gwclist[i].price;
					}
					return total;
				}
			},
			methods:{
				jia(id){
					
					var that=this;
					var request=window.indexedDB.open("cha",7.0);
					request.onsuccess=function(e){
						console.log("打开数据库成功");
						var db=e.target.result;
						var transaction=db.transaction(["gwc"],"readwrite");
						var store=transaction.objectStore("gwc");
						var a={};
						for(var j=0;j<that.gwclist.length;j++)
						{
							if(that.gwclist[j].id==id)
							{
								a=that.gwclist[j]
							}
						}
						a.shuliang=a.shuliang+1;
						var dataRequest=store.put(a);
						dataRequest.onsuccess=function(){
						   console.log("数量加一")
						}
					}
				},
				jian(id){
					var that=this;
					var request=window.indexedDB.open("cha",7.0);
					request.onsuccess=function(e){
						console.log("打开数据库成功");
						var db=e.target.result;
						var transaction=db.transaction(["gwc"],"readwrite");
						var store=transaction.objectStore("gwc");
						//把点击的商品和数据库挂钩
						var a={};
						for(var j=0;j<that.gwclist.length;j++)
						{
							if(that.gwclist[j].id==id)
							{
								a=that.gwclist[j]
							}
						}
						if(a.shuliang>1){
						a.shuliang=a.shuliang-1;
						var dataRequest=store.put(a);
						dataRequest.onsuccess=function(){
						   console.log("数量减一")
						}	
						}else if(a.shuliang==1){
							console.log("不能再减啦");
							//删除商品
							a={};
							dataRequest=store.delete(id);
							dataRequest.onsuccess=function(){
								console.log("删除成功");
							}
							location.reload();
						}
					}
				},
				zhifu(){
					if(sessionStorage.getItem("username")==null){
						alert("请先登录哦");
					}else{
						alert("支付");
						//删除购物车,生成订单，存入数据库
						
						//获取提交时间
						var d=new Date();
						var myday=d.getDate();
						var mymouth=d.getMonth()+1;
						var myyear=d.getFullYear();
						var myhour=d.getHours();
						var myminutes=d.getMinutes();
						var mysecond=d.getSeconds();
						var times=myyear+':'+mymouth+':'+myday+':'+myhour+':'+myminutes+':'+mysecond;
						var dingdan=[];
						for(var i=0;i<this.gwclist.length;i++){
							dingdan.push(this.gwclist[i]);
							dingdan[i].mainame=sessionStorage.getItem("username");
							dingdan[i].time=times;
						}
						console.log(dingdan);
						
						//生成数据库
						var request = indexedDB.open("dingdan", 2);
						// 开启事务
						request.onsuccess=function(e){
							var db = event.target.result;
							var transaction=db.transaction(["title"],"readwrite");
							var store=transaction.objectStore("title");
									for(var j=0;j<dingdan.length;j++){
										var addrequest=store.add(dingdan[j]);
										addrequest.onsuccess=function(){
											console.log("插入订单数据成功");
										}
									}
						}
						//清空购物车，刷新页面
						var requests = indexedDB.open("cha", 7);
						requests.onsuccess=function(e){
						var dbs = event.target.result;
						var transaction1=dbs.transaction(["gwc"],"readwrite");
						var store1=transaction1.objectStore("gwc");
						var dataRequest=store1.clear();
						dataRequest.onsuccess=function(){
							console.log("购物车清空");
								location.reload();
						}
						}
					}
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
						var transaction=db.transaction(["gwc"],"readwrite");
						var store=transaction.objectStore("gwc");
						    let men1 = store.openCursor();
						    men1.onsuccess = function (e) {
						        var data = e.target.result;
						        if (data) {
						            console.log(data.value);
												that.gwclist.push(data.value);
												 var img=require("../assets/listimg/"+data.value.id+".png")
												that.imgs.push(img);
						            data.continue(); // 使游标下移
						        } else {
						            console.log("No more entries!");
						        }
						    };
					};
					console.log(that.gwclist);
					})
			}
		}
</script>

<style>
	li{
		overflow: hidden;
		position: relative;
	}
	.gwcimg{
		width: 100px;
		height: 100px;
		margin-top: 20px;
		margin-left: 15%;
	}
	.detailname{
		position: absolute;
		top:20px;
		left: 50%;
	}
	.detailprice{
		position: absolute;
		top:60px;
		left: 50%;
	}
	.gwclogo{
		width: 50px;
		height: 50px;
	}
  .jias{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: rgb(53,193,240);
		color: white;
		text-align: center;
		line-height:20px;
		border-radius:10px;
		float: right;
	}
	.jians{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: rgb(53,193,240);
		color: white;
		text-align: center;
		line-height:20px;
		border-radius: 10px;
		float: right;
		margin-right: 20px;
	}
	.shuliang{
		float: right;
		margin-left: 5px;
		margin-right: 5px;
	}
 .detailbox1{
	 
 }
 .detailbox2{
	 overflow: hidden;
	 position: absolute;
	 top:30%;
	 right: 0px;
 }
 .total{
	 float: right;
	 margin-right: 20px;
 }
 .zhi{
	 background-color: rgb(53,193,240);
	 display: inline-block;
	 width: 100px;
	 height: 40px;
	 border: 1px solid rgb(53,193,240);
	 color: white;
	margin-left:70%;
 }
</style>
