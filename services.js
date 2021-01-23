const http=require("http");
const https=require("https");
const fs=require("fs")
const util=require("util");
const os=require("os");
const path=require("path");
const cp=require("child_process")
const dirs=require("./lib/dirs/index")
const __dirname=process.cwd();
let global_error=[];
console.log("Debug");
window.d_lib_list ={};
function push_log(logs){
window.download_log=$("#logs");
download_log.innerHTML+=(logs);
}

function copy_natives(obj){
try{
dirs.copy_dirs(path.join(__dirname,"./mcfiles/natives"),path.join(__dirname,`./mcfiles/.minecraft/versions/${obj.id}/${obj.id}-natives`));
}catch(e){
console.log(e);
copy_natives(obj);
}

}
window.$=function(cd){return document.querySelector(cd);}
try{
exports.ccc=1;
fs.writeFileSync("D:\\mcin\\services.txt","success");
}catch(e){
	
	
}
process.on('uncaughtException', function (err) {
global_error.push(err)
process.stdout.write(JSON.stringify({msg:"err",error:err}));
	return false;
});
let asset=0;
let https_agent=new https.Agent({timeout:1000*60*60*24});
let  http_agent=new http .Agent({timeout:1000*60*60*24});
let lib=async function(u,p){
return new Promise(function(ok,fall){


if(u.indexOf("lwjgl")>=0){
console.info(`lib("${u}","${p}");`)
}
if(localStorage["api"]=="bmcl"){
u=u.replace("https://libraries.minecraft.net","https://bmclapi2.bangbang93.com/maven");
}
console.warn("U:"+u+"\nP:"+p);
push_log(`Loading Libraries:${p}<br />`);
d_lib_list[u]=1;
(window.ar_s)++;
if(fs.existsSync(path.join(__dirname,`./mcfiles/.minecraft/libraries/${p}`))){
push_log(`ALREADY Downloaded ${p} Module<br />`);
c++;
d_lib_list[u]=0;
ok(c);
return;
}
console.log(`./mcfiles/.minecraft/libraries/${p}`)

var prop=u.indexOf("https")==0?https:http;
var curagent=u.indexOf("https")==0?https_agent:http_agent;
prop.get(u,{agent:curagent},function(ccc){
console.log(ccc)
if(ccc.statusCode==200){
ccc.on('error',async function(){await lib(u,p);});
ccc.on('end',function(){
d_lib_list[u]=0;
console.log((window.c)++);
push_log(`Downloaded ${c} Modules<br />`);
$("process").value++;
ok(c);
});
console.log( "Lib::::::::"+path.dirname(path.join(__dirname,`./mcfiles/.minecraft/libraries/${p}`))  )
try{
dirs.mkdirsSync(path.dirname(path.join(__dirname,`./mcfiles/.minecraft/libraries/${p}`)));
}catch(e){
console.log(e)
}
var wristr=fs.createWriteStream(path.join(__dirname,`./mcfiles/.minecraft/libraries/${p}`),{highWaterMark:65536*65536*65536});
ccc.pipe(wristr);
wristr.on("pipe",function(){
console.log("Pipeing")
});
ccc.on("data",function(){
	console.log("Get Data from",p);
});


}
if(ccc.statusCode==301||ccc.statusCode==302){
ok(301000);
lib(ccc.headers.location,p);
}
});
});
};


let main_url=async function(u,v){
if(localStorage["api"]=="bmcl"){
u=u.replace("https://launcher.mojang.com","https://bmclapi2.bangbang93.com");
}
console.log("inside main_url",u)
	return new Promise(function(ok,fall){
console.info("Main_url Start"+u+"\n"+v);
var curagent=u.indexOf("https")==0?https_agent:http_agent;
https.get(u,{agent:curagent},function(ress){
console.log(ress)
ress.on('data',function(){console.log("got data");});
ress.on('error',async function(){console.log("Bugs");await main_url(u,v);});
ress.on("end",function(){
console.info("Succeed Download Main");
push_log(`Downloaded Main<br />`);
ok();
});
console.log(`./mcfiles/.minecraft/versions/${v}/${v}.jar`)
dirs.mkdirsSync(path.dirname(path.join(__dirname,`./mcfiles/.minecraft/versions/${v}/${v}.jar`)))
ress.pipe(fs.createWriteStream(path.join(__dirname,`./mcfiles/.minecraft/versions/${v}/${v}.jar`),{highWaterMark:65536*65536*65536*65536}));
});
	});
};
window.main_url=main_url;
let download_asset=async function(f,hash){
return new Promise(function(ok,fall){
	//debugger;
console.warn("Asset Start:\n"+hash);
var curagent=assets_root.indexOf("https")==0?https_agent:http_agent;
https.get(assets_root+"/"+f+"/"+hash,{agent:curagent},function(ress){
ress.on("end",function(){console.warn("Succeed Download Asset");asset++;ok(asset);});
ress.on('error',async function(){await download_asset(f,hash);});
try{
ress.pipe(fs.createWriteStream(path.join(__dirname,`./mcfiles/.minecraft/assets/objects/${f}/${hash}`)),{highWaterMark:65536*65536*65536});
}catch(e){
console.log(e)
}

});
});
};
window.download_asset=download_asset;
//download_assets("https://launchermeta.mojang.com/v1/packages/e022240e3d70866f41dd88a3b342cf842a7b31bd/1.17.json","1.17")
async function wait_tick(){
	return new Promise(function(ok,cancel){
		setTimeout(ok,10);
	});
}
let assets_finish=async function(v){
	console.info("Succeed Download Assets");
	await wait_tick();
		var obj=JSON.parse(fs.readFileSync(path.join(__dirname,`./mcfiles/.minecraft/assets/indexes/${v}.json`)));
		
		var ob=obj.objects,keys=Object.keys(ob),values=Object.values(ob);
		console.info(ob)
		for (var s=0;s<keys.length;s++){
		var f=values[s].hash.slice(0,2);
/*
setTimeout(async function(f,hash_s){
console.log(`./mcfiles/.minecraft/assets/objects/${f}`)
console.log(asset)
dirs.mkdirsSync(path.join(__dirname,`./mcfiles/.minecraft/assets/objects/${f}`))
await download_asset(f,hash_s)
},10*s,f,values[s].hash);
*/
		console.log(`./mcfiles/.minecraft/assets/objects/${f}`)
		console.log(asset)
		dirs.mkdirsSync(path.join(__dirname,`./mcfiles/.minecraft/assets/objects/${f}`))
		await download_asset(f,values[s].hash)
		}
}
let download_assets=async function(u,v,info){
console.info("Assets Start");
if(localStorage["api"]=="bmcl"){
u=u.replace("https://launchermeta.mojang.com","https://bmclapi2.bangbang93.com");
}
asset=0;
var curagent=u.indexOf("https")==0?https_agent:http_agent;

	return new Promise(function(aaaa,bbbb){
		https.get(u,{agent:curagent},function(ress){
		////debugger;
		console.log(ress);
		try{
dirs.mkdirsSync(path.dirname(path.join(__dirname,`./mcfiles/.minecraft/assets/indexes/${v}.json`)))
ress.pipe(fs.createWriteStream(path.join(__dirname,`./mcfiles/.minecraft/assets/indexes/${v}.json`),{highWaterMark:65536*65536*65536}));
}catch(e){console.log(e);}

			////debugger;
		ress.on('error',async function(e){console.info(e);await download_assets(u,v);dddd();});
		ress.on("end",function(){
		////debugger;
		var two_b2t=setInterval(async function(){
		var info2=fs.statSync(path.join(__dirname,`./mcfiles/.minecraft/assets/indexes/${v}.json`));
		if(info.size==info2.size){
			clearInterval(two_b2t);
		await assets_finish(v);	
		aaaa();
		}
		
		},1000);
		
		});
		
		
		});

});
}


window.download_assets=download_assets;
console.log(download_assets);
let test=function(testtt){
	
	console.log("TESTING:"+testtt);
}
let get_json=async function(curagent,url,target,self_s,num,size){
	if(fs.existsSync((path.join(__dirname,`./mcfiles/.minecraft/versions/${ver_arr[num]}/${ver_arr[num]}.json`)))){
		return true;
	}
	console.log("Downloading1")
	return new Promise(function (resolve, reject){
	https.get(url,{agent:curagent},async function(res){
		if(res.statusCode==301||res.statusCode==302){
		url_arr[num]=(res.headers.location);
		await self_s(num);
		return;
		}
		res.pipe(fs.createWriteStream(path.join(__dirname,`./mcfiles/.minecraft/versions/${ver_arr[num]}/${ver_arr[num]}.json`),{highWaterMark:65536*65536*65536}));
		res.on('error',async function(){
			var two_b1t=setInterval(async function(){
			var info2=fs.statSync(path.join(__dirname,`./mcfiles/.minecraft/versions/${ver_arr[num]}/${ver_arr[num]}.json`));
			if(size==info2.size){
			clearInterval(two_b1t);
			resolve();
			}
			},1000);
			
		});
		res.on("end",async function(){resolve();});
	});
	});
}
window.get_json=get_json;
window.processs=0,process_all_show="0%";
let process_all_reshow=function(){
	process_all_show=(processs*100)+"%";
	$("#all_range").innerHTML=process_all_show;
}
let d=async function(num){
	//debugger;
try{
console.log("Started:"+ver_arr[num])
//var forge=document.getElementById("forge_d").checked;
console.log((path.join(__dirname,`./mcfiles/.minecraft/versions/${ver_arr[num]}`)))
dirs.mkdirsSync((path.join(__dirname,`./mcfiles/.minecraft/versions/${ver_arr[num]}`)));
window.c=0;
var curagent=url_arr[num].indexOf("https")==0?https_agent:http_agent;

await get_json(curagent,url_arr[num],`./mcfiles/.minecraft/versions/${ver_arr[num]}/${ver_arr[num]}.json`,d,num);
await wait_tick();
processs+=(0.1);
//debugger;
console.log("Get "+ver_arr[num])
var temppppppp=0;
for (var s=0;s<1000000;s++)temppppppp++;
var obj=JSON.parse(fs.readFileSync(path.join(__dirname,`./mcfiles/.minecraft/versions/${ver_arr[num]}/${ver_arr[num]}.json`)));
console.info(obj)
var downloads=obj.downloads;
console.info("Client:"+downloads.client.url)
await window.main_url(downloads.client.url,obj.id);
processs+=(0.4);
var libraries=obj.libraries;
var libss=[];
var lib_len=libraries.length,per_lib=0.2/libraries.length;
for (var s=0;s<lib_len;s++){
var o=libraries[s];
var u,p;
try{
//console.log(o.downloads.artifact.url)
//
if(o.downloads.artifact){
u=o.downloads.artifact.url;
p=o.downloads.artifact.path;
}
else if(o.downloads.classifiers){
if(o.downloads.classifiers["natives-windows"]){
u=o.downloads.classifiers["natives-windows"].url;
p=o.downloads.classifiers["natives-windows"].path;
}
else{
var x64=(os.arch().indexOf("64"))>0;
if(x64){
u=o.downloads.classifiers["natives-windows-64"].url;
p=o.downloads.classifiers["natives-windows-64"].path;
}
else{
u=o.downloads.classifiers["natives-windows-32"].url;
p=o.downloads.classifiers["natives-windows-32"].path;
}
}
}

if(libss.indexOf(u)==-1){
console.log(u);
await lib(u,p);
}

}catch(e){console.log(e)};

processs+=per_lib;
process_all_reshow();
}
//debugger;
copy_natives(obj);
processs+=0.1;
process_all_reshow();
await download_assets(obj.assetIndex.url,ver_arr[num],obj.assetIndex);
processs+=0.2;
process_all_reshow();
//dirs.checkDirectory("./mcfiles/natives",`./mcfiles/.minecraft/versions/${obj.id}/${obj.id}-natives`,window.copy_dirs);
}catch(e){
	console.log(e)
	
}

}

