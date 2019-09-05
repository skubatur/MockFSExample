var files = {};

var processDir = function (path, entry) {
    var files;
    mockfs.list(path, function(err, result){
        if (err){
            //files = {};
        }
        else{
            files = result;
			load_files();
        }
    });
    
    function load_files(){
        files.forEach(function (f) {
            try{
                var childPath = mockfs.join(path, f);
                var stat;
                
                var TIMEOUT = 500;
                var timer = setTimeout(function () {
                    timer = null;
                    entry[f] = "error: Filesystem timeout";
                }, TIMEOUT);
                
                mockfs.stat(childPath, function(err, result){
                    if (timer){
                        clearTimeout(timer);
                        if (err){
                            entry[f] = "error: " + err;
                        }
                        else{
                            stat = result;
                            process_stat();
                        }
                    }
                });
                
                function process_stat(){
                    if (stat.isDirectory()) {
                        entry[f] = {};
                        processDir(childPath, entry[f]);
                    } else if (stat.isFile()) {
                        entry[f] = "file";
                    } else {
                        entry[f] = "unknown";
                    }
                }
                
             } catch(e) {
                entry[f] = "error: " + e.message;
             }
           	
        });
	}  
};




function final(param1, param2, callback2){
	processDir(param1, param2);
    setTimeout(() => callback2(), 1000);
}

final("/", files, function (){
    output(files);
});

