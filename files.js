const fs = require('fs');

let txtFile = "document.txt";
let str = fs.readFileSync(txtFile,'utf8');
breakLines = str.split("\n")
const args = process.argv.slice(2)
var i = 0
/*for(i;i<args.length;i++){
    console.log(args[i])
}*/ 
breakLines[1] = breakLines[1].replace(/Hola/, 'replacement');
newContent = ""
var j = 0
for(j;j<breakLines.length;j++){
    newContent = newContent + breakLines[j] + "\n"
}

fs.writeFile(txtFile, newContent, 'utf8', function (err) {
    if (err) return console.log(err);
 });
//console.log(result);