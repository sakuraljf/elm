<template>
	<div id="app">
			<router-view></router-view>
			<div class="daohang">
				<router-link to="/goodsall" class="dh">
					<img :src="img1" class="daohangimg">
					<span class="dhname">商家</span>
				</router-link>
				<router-link to="/shopping" class="dh" >
					<img :src="img2" class="daohangimg">
					<span class="dhname">购物车</span>
				</router-link>
				<router-link to="/titles" class="dh">
					<img :src="img3" class="daohangimg">
					<span class="dhname">订单</span>
				</router-link>
				<router-link to="/my" class="dh">
					<img :src="img4" class="daohangimg">
					<span class="dhname">我的</span>
					</router-link>
			</div>
			
	</div>

</template>
<script>
	import heads from "./components/heads.vue"
	export default{
		name:"app",
		data(){
			return {
				imgdh:[require("./assets/dhimg/store.png"),require("./assets/dhimg/car.png"),require("./assets/dhimg/ding.png"),require("./assets/dhimg/my.png")],
				imgdh1:[require("./assets/dhimg/storez.png"),require("./assets/dhimg/carz.png"),require("./assets/dhimg/dingz.png"),require("./assets/dhimg/myz.png")],
				img1:require("./assets/dhimg/store.png"),
				img2:require("./assets/dhimg/car.png"),
				img3:require("./assets/dhimg/ding.png"),
				img4:require("./assets/dhimg/my.png"),
				pathming:["/goodsall","/shopping","/titles","/my"]
			}
		},
		components:{
			heads
		},
		created(){
			for(var j=0;j<4;j++){
				if(this.$route.path==this.pathming[j]){
					for(var i=0;i<4;i++){
						this['img'+(i+1)]=this.imgdh[i];
					}
					var ljf=j+1;
					this['img'+ljf]=this.imgdh1[j];
				};
			}
		},
		watch:{
			'$route' (to){
				for(var j=0;j<4;j++){
					if(this.$route.path==this.pathming[j]){
						for(var i=0;i<4;i++){
							this['img'+(i+1)]=this.imgdh[i];
						}
						var ljf=j+1;
						this['img'+ljf]=this.imgdh1[j];
					};
				}
			}
			// immediate:true 只有路由跳转watch才能监听到,加上这句话可以让监听器开始后立即执行
		}
	}
</script>
<style>
.daohang{
	position: fixed;
	bottom: 2px;
	width: 100%;
	display: flex;
	height: 70px;
	border-top: 1px silver solid;
}
.dh{
	color:black;
	text-decoration: none;
	width: 25%;
	text-align: center;
	padding-top:50px;
  position: relative;
	background-color: white;
}
.daohangimg{
	width: 40px;
	height:40px;
	position: absolute;
	top: 0px;
	/* left: 43%; */
}
.dhgname{
	position: absolute;
	top:40px;
}

</style>
