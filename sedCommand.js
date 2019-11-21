const fs = require('fs');

function validRegex(regexLine, regexExpression){
    console.log(regexLine)
    if(regexExpression.test(regexLine)){
        return true
    }else{
        console.log('Invalid Command')
        return false
    }
}

function replaceWord(bl, ow, nw, f){
    let j = 0
    for(j;j<bl.length;j++){
        if(f === "g"){
            var change = new RegExp(ow,'g')
            bl[j] = bl[j].replace(change, nw);
        }else{
            bl[j] = bl[j].replace(ow, nw);
        }
    }
    return bl
}

var txtFile = "";
var re = new RegExp(/^s\/[A-Za-z]+\/[A-Za-z]+\/[g|p]?$/)
var originalWord = ""
var newWord = ""
var argv = require('yargs')
    .boolean('n')
    .nargs('f', 1)
    .describe('f', 'commands in file')
    .nargs('e', 1)
    .describe('e', 'Multiple commands')
    .argv;

console.log(argv)

if(!(argv.f || argv.e)){
    txtFile = argv._[1]
    originalWord = argv._[0].split("/")[1]
    newWord = argv._[0].split("/")[2]
    operationFlag = argv._[0].split("/")[3]
}else{
    txtFile = argv._[0]
}
try{
    let str = fs.readFileSync(txtFile,'utf8');
    breakLines = str.split("\n")
    if(argv.e){
        let j=0
        for (j;j<argv.e.length;j++){
            if(validRegex(argv.e[j],re)){
                originalWord = argv.e[j].split("/")[1]
                newWord = argv.e[j].split("/")[2]
                breakLines = replaceWord(breakLines, originalWord, newWord, argv.e[j].split("/")[3])
                }
            else{
                console.log(`Command in line ${j+1} is not valid`)
                }
            }
    }else if(!(argv.f || argv.e)){
        if(validRegex(argv._[0],re)){
            breakLines = replaceWord(breakLines, originalWord, newWord, operationFlag)                
            }
        }
    if (argv.f){
        try{
            let str = fs.readFileSync(argv.f,'utf8');
            var commandFile = str.split("\r\n")
            console.log(commandFile)
        for(command of commandFile){
            if(validRegex(command,re)){
                originalWord = command.split("/")[1]
                newWord = command.split("/")[2]
                breakLines = replaceWord(breakLines, originalWord, newWord, command.split("/")[3])
                }
            else{
                console.log(`Command in line ${j+1} is not valid`)
                }
            }
        }catch{
            console.log("Error in file passed")
        }
    }
    if (argv.i !== undefined){
        newContent = ""
        let j = 0
        for(j;j<breakLines.length;j++){
            newContent = newContent + breakLines[j] + "\n"
        }
        if(argv.i !== true){
            fs.copyFileSync(txtFile, `${txtFile}_${argv.i}.txt`, (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination');
              });
        }
        fs.writeFileSync(txtFile, newContent, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    }else if (argv.n){
        let j = 0
        for(j;j<breakLines.length;j++){
            console.log(breakLines[j])
            console.log(originalWord)
            if (breakLines[j].includes(originalWord)){
                console.log(breakLines[j])
            }
        }
    }
}catch{
    console.log("The file doesn't exist")
}