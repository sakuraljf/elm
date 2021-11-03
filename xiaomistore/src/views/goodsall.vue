<template>
	<div >
		<heads></heads>
		<div class="shangping">
			
			<ul class="listul">
				<li v-for="(good,i) in chayanlist" :key="good.id" class="listli">
					<router-link :to="'/detail/'+good.id">
						<img :src="imgs[i]" class="listimg">
						<span class="chaname">{{good.name}}</span>
						<span class="chaprice">￥{{good.price}}</span>
					</router-link>
				</li>
				<router-view></router-view>
			</ul>
			<div style="height:100px;"></div>
		</div>
	</div>
</template>

<script>
	import Goods from "../assets/goods.js"
	import heads from "../components/heads.vue"
  
	
	export default{
		data(){
			return {
				img1:require("../assets/listimg/1.png"),
				imgs:[],
				goods:Goods,
				chayanlist:[]
			}
		},
		created() {
		
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
				    let men1 = store.openCursor();
				    men1.onsuccess = function (e) {
				        var data = e.target.result;
				        if (data) {
				            console.log(data.value);
										that.chayanlist.push(data.value);
										 var img=require("../assets/listimg/"+data.value.id+".png")
										that.imgs.push(img);
				            data.continue(); // 使游标下移
				        } else {
				            console.log("No more entries!");
				        }
				    };
			};
			
			
			})
			
		},
		components:{
			heads:heads
		}
	}
</script>
<style>
	.*{
		padding: 0px;
		margin: 0px;
	}
	.shangping{
		position: absolute;
		top: 250px;
		left:0px;
		width: 100%;
	}
	.listimg{
		width: 100px;
		height: 100px;
	}
	.listli{
		margin-left:120px;
		position: relative;
		margin-bottom:20px;
	}
	.listul{
		list-style-type: none;
	}
	.chaname{
   position: absolute;
	 top: 0px;
	 left:110px;
	 color: black;
	}
	.chaprice{
		position: absolute;
		top: 70px;
		left:110px;
		color: red;
	}
</style>
