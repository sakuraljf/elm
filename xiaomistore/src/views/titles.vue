<template>
	<div class="maindiv">
		<ul>
			<li v-for="item in dingdan" :key="item.id+item.time" class="titleli">
				<div class="titlebox1">
					<div class="titlename">{{item.name}}</div>
					<div class="titletime">{{item.time}}</div>
				</div>
			 <div class="titlebox2">
			 <div class="titleprice">￥{{item.price}}</div>
			 <div class="titleping">立即评价</div>	 
			 </div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"titles",
		data(){
			return {
				dingdan:[]
			}
		},
		mounted() {
			this.$nextTick(function () {
				var that=this;
				let arr=[];
				
				var request=window.indexedDB.open('dingdan',2.0);
				request.onsuccess=function(e){
					console.log("打开数据库成功");
					var db=e.target.result;
					var transaction=db.transaction(["title"],"readwrite");
					var objectStore=transaction.objectStore("title");
					var username=sessionStorage.getItem("username")
					var singleKeyRange = IDBKeyRange.only(username);
					var index = objectStore.index("mainame");
					index.openCursor(singleKeyRange).onsuccess = function(event) {
					  var cursor = event.target.result;
					  if (cursor) {
							
							that.dingdan.push(cursor.value);
					    // 当匹配时进行一些操作
					    cursor.continue();
					  }
        }
				}
			})
	}
	}
</script>

<style>
	.maindiv{
		background-color: rgb(241,243,244);
	}
	.titleli{
		background-color: white;
		margin-bottom: 15px;
		position: relative;
		height:100px;
		border-radius:15px;
	}
	.titlebox1{
		position: absolute;
		top:5px;
		left:20px
	}
	.titlebox2{
		position: absolute;
		top:5px;
		right: 20px;
	}
	.titlename{
		margin-bottom: 30px;
	}
	.titleprice{
		margin-bottom: 30px;
	}
	.titleping{
		border: 1px solid rgb(53,193,240);
		border-radius:10px;
		height: 20px;
		color: white;
		background-color:rgb(53,193,240) ;
	}
</style>
