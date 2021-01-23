const fs=require('fs');
const path=require('path');
module.exports.copy_dirs=function(src,dst){
    let paths = fs.readdirSync(src); //ͬ����ȡ��ǰĿ¼
    paths.forEach(function(path){
        var _src=src+'/'+path;
        var _dst=dst+'/'+path;
        fs.stat(_src,function(err,stats){  //stats  �ö��� �����ļ�����
            if(err)throw err;
            if(stats.isFile()){ //����Ǹ��ļ��򿽱� 
                let  readable=fs.createReadStream(_src);//������ȡ��
                let  writable=fs.createWriteStream(_dst);//����д����
                readable.pipe(writable);
            }else if(stats.isDirectory()){ //��Ŀ¼�� �ݹ� 
                module.exports.checkDirectory(_src,_dst,copy);
            }
        });
    });
};
module.exports.checkDirectory=function(src,dst,callback){
    fs.access(dst, fs.constants.F_OK, (err) => {
        if(err){
            fs.mkdirSync(dst);
            callback(src,dst);
        }else{
            callback(src,dst);
        }
      });
};

module.exports.mkdirs=function(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            // console.log(path.dirname(dirname));  
            module.exports.mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
                console.log('��' + path.dirname(dirname) + 'Ŀ¼������' + dirname  +'Ŀ¼');
            });  
        }  
    });  
};  
module.exports.mkdirsSync=function(dirname) {
	window.console.log("lib"+dirname);
	fs.appendFileSync("log.txt","lib"+dirname);
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (module.exports.mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  };