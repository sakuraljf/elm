const http=require('http');
const ejs=require('ejs');
//引入mogodb
const {MongoClient}=require('mongodb');
//定义数据库连接地址
const url=' mongodb://admin:123456@127.0.0.1:27017';
//定义数据库
const dbName='itying';
//实例化MongoClient传入数据库连接地址
const client=new MongoClient(url,{useUnifiedTopology:true});
//连接数据库
client.connect((err)=>{
	if(err){
		console.log(err);
		return ;
	}
	console.log("数据库连接成功");
	let db=client.db(dbName);
	// 查找数据
	db.collection("user").find().toArray((err,data)=>{
		console.log(data);
		//关闭数据库
		client.close();
	})

})
