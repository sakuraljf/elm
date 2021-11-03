<template>
<div>
			<div class="titlemain" v-bind:style="{opacity:opacitys}">
				<div class="title">
					<div class="title1">茶颜悦色(锦华时代镖局店)</div>
					<div class="title2" >蓝骑士专送</div>
					<div class="title3">约32分钟·月售2491·食安险</div>
					<img src="../assets/img/logo.png" class="imgtitle"/>
						<div class="clear"></div>
					<div class="gonggao" @click="opens()">公告:去的尽管去了，来的尽管来着；去来的中间，又怎样地匆匆呢？早上我起来的时候，小屋里射进两三方斜斜的太阳。太阳他有脚啊，轻轻悄悄地挪移了；我也茫茫然跟着旋转。于是——洗手的时候，日子从水盆里过去；吃饭的时候，日子从饭碗里过去；默默时，便从凝然的双眼前过去。我觉察他去的匆匆了，伸出手遮挽时，他又从遮挽着的手边过去，天黑时，我躺在床上，他便伶伶俐俐地从我身上跨过，从我脚边飞去了。等我睁开眼和太阳再见，这算又溜走了一日。我掩着面叹息。但是新来的日子的影儿又开始在叹息里闪过了。</div>
				</div>
			</div>
			
			<div class="gonggaoxi" v-bind:style="{display:displays}" style="z-index:3" >
				<h3>茶颜悦色</h3>
				<div>该商户已购买食品安全责任险,食品安全有保障</div>
				<h3>公告</h3>
				<div>去的尽管去了，来的尽管来着；去来的中间，又怎样地匆匆呢？早上我起来的时候，小屋里射进两三方斜斜的太阳。太阳他有脚啊，轻轻悄悄地挪移了；我也茫茫然跟着旋转。于是——洗手的时候，日子从水盆里过去；吃饭的时候，日子从饭碗里过去；默默时，便从凝然的双眼前过去。我觉察他去的匆匆了，伸出手遮挽时，他又从遮挽着的手边过去，天黑时，我躺在床上，他便伶伶俐俐地从我身上跨过，从我脚边飞去了。等我睁开眼和太阳再见，这算又溜走了一日。我掩着面叹息。但是新来的日子的影儿又开始在叹息里闪过了。</div>
			  <div class="close" @click="close()">叉掉我把</div>
			</div>
		</div>
</template>

<script>
	export default{
		name:'heads',
		data(){
			return{
				opacitys:"1",
				displays:"none"
			}
		},
		methods:{
			opens(){
				
					this.opacitys="0.1";
					this.displays="block";
			},
			close(){
				this.opacitys="1";
				this.displays="none";
			}
		}
	}
</script>

<style>
	*{
		padding: 0px;
		margin: 0px;
	}
	.titlemain{
		width: 100%;
		height: 200px;
		position: absolute;
		background-image: url(../assets/img/beijing.jpg);
	}
	.title{
		width: 80%;
		height: 100px;
		margin: auto;
		position: relative;
		margin-top: 100px;
		background-color: white;
		border-radius: 18px;
	}
	.imgtitle{
		height: 50px;
		width: 50px;
		position: absolute;
		top:10px;
		right:10px;
	}
	.title1{
		font-weight: bold;
		font-size: 16px;
		padding-top: 10px;
	  margin-left: 20px;
		margin-bottom: 15px;
	}
	.title2{
		color: aqua;
		border: 0.5px #00FFFF solid;
		width: 60px;
		height: 20px;
		border-radius: 4px;
		float: left;
		margin-left:20px;
		font-size: 12px;
	}
	.title3{
		float: left;
		margin-left: 10px;
		font-size: 10px;
		margin-top: 2px;
	}
	.clear{
		clear: both;
	}
	.gonggao{
		margin-top: 10px;
		margin-left: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color:silver;
		font-size: 12px;
	}
	.gonggaoxi{
		position: absolute;
		top:25%;
		left:10%;
		width:80%;
		background-color: white;
		font-size: 10px;
	}
</style>
