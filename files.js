const fs = require('fs');

let txtFile = "document.txt";
//var re = new RegExp('\s/\\');
var flag_n = false
var flag_i = false
var flag_f = false
try{
    var flags = ["-n", "-i", "-e", "-f"]
    let str = fs.readFileSync(txtFile,'utf8');
    breakLines = str.split("\n")
    const args = process.argv.slice(2)
    var i = 0
    for(i;i<args.length;i++){
        console.log(args[i])
        if (flags.includes(args[i])){
            if (args[i] === flags[0]){
                flag_n = true
            }else if (args[i] === flags[1]){
                flag_i = true
            }else if (args[i] === flags[3]){
                flag_f = true
            }
        }
    }
    if (flag_i){
        newContent = ""
        var j = 0
        for(j;j<breakLines.length;j++){
            breakLines[j] = breakLines[j].replace(/Hola/, 'replacement');
            newContent = newContent + breakLines[j] + "\n"
        }
        fs.writeFile(txtFile, newContent, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    }else if (flag_n){
        var j = 0
        for(j;j<breakLines.length;j++){
            breakLines[j] = breakLines[j].replace(/Hola/, 'replacement');
            if (breakLines[j].includes('Hola')){
                console.log(breakLines[j])
            }
        }
    }else if(flag_f){
        console.log("Continuar perro")
    }
    
}
catch{
    console.log("El archivo no existe")
}
