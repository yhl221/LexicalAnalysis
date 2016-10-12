
let  variable = [];//变量名表
let  number = [];//常数表
let  retainPos; //关键字种别码
let symbolPos; //界符种别码
function isBlank(char) {//判断是否是空格
    if (char == 32) {
        return true;
    }
    return false;
}

function isLetter(char) {//是否是字母
    if ((char >= 65 && char <= 90) || (char >= 97 && char <= 122)) {
        return true;
    }
    return false;
}

function isDigit(char) {//判断是否是数字
    if (char >= 48 && char <= 57) {
        return true;
    }
    return false;
}

function isSymbol(symbol,strToken) {//判断是否是界符
    for(let i=0;i<symbol.length;i++){
        if(strToken===symbol[i]){
          symbolPos=36+i;
            return true;
        }
    }
    return false;
}

function isRemainWord(retainWord, strToken){//判断是否是关键字

    for(let i=0;i<retainWord.length;i++){
        if(strToken===retainWord[i]){
           retainPos=i;
            return true;
        }
    }

    return false;
}

function isNumber(strToken) {//判断是否是常数
    for(let i=0;i<strToken.length;i++){
        if(isDigit(strToken[i].charCodeAt()))
            return true;
    }

    return false;
}

function existNumber(number,strToken) {
    //判断常数表中是否存在该常数，如果存在，则return；如果不存在，则将该常数插入常数表
    for(let i=0;i<=number.length;i++){
        if(number[i]===strToken)
            return;
    }

    number.push(strToken);
}

function isVariable(strToken) {
    //判断是否为变量
  for(let i=0;i<strToken.length;i++){
      let unicode = strToken[i].charCodeAt();
      if((isLetter(unicode)||isDigit(unicode)) && !isRemainWord(strToken))
          return true;
  }
    return false;

}

function existVariable(variable,strToken) {
    //判断变量表中是否存在该变量名，如果存在,则return;如果不存在，则将该变量名插入变量名表
    for(let i=0;i<=variable.length;i++){
        if(variable[i]===strToken)
            return;
    }

    variable.push(strToken);
}

function main() {
    let strToken = "";    //存放构成单词符号的字符串
    let string="";
     let result=[];//用来存放分析结果的字符串
    const retainWord = ["main",
        "auto", "short", "int", "long", "float", "double", "char", "struct"
        , "union", "enum", "typedef", "const", "unsigned", "signed", "extern", "register"
        , "static", "volatile", "void", "if", "else", "switch", "case", "for"
        , "do", "while", "goto", "continue", "break", "default", "sizeof", "return"];
    const symbol=[ "=","+","-","*","/","++","--","+=","-=",
        "*=","/=","==","!=",">","<",">=","<=","(",
        ")","[","]","{","}",",",":",";"];

    const inputString="int main ( ) { int a = 1 ; int b = 3 ; int sum = a + b ; } ";
    const stringArray = inputString.split("");
     for(let i=0;i<stringArray.length;i++){
         let unicode = stringArray[i].charCodeAt();
         let char = stringArray[i];
         if(isBlank(unicode)==false) {
             if (isLetter(unicode)) {
                 if (isLetter(unicode) == true || isDigit(unicode) == true){
                     strToken = strToken.concat(char);
                 }
             } else if (isDigit(unicode)) {
                 strToken = strToken.concat(char);
             } else if(isSymbol(symbol,char)) {
                 strToken = strToken.concat(char);
             }
         }else if(isNumber(strToken)){
             existNumber(number,strToken);
             string = `(34,'${strToken}')`;//将输出结果以字符串
             result.push(string);//将结果字符串存入数组
             strToken="";
         }else if(isVariable(strToken)){
             existVariable(variable,strToken);
             string = `(33,'${strToken}')`;
             result.push(string);
             strToken="";
         }else if(isRemainWord(retainWord,strToken)){
             string = `(${retainPos},'${strToken}')`;
             result.push(string);
             strToken="";
         }else if(isSymbol(symbol,strToken)){
             string = `(${symbolPos},'${strToken}')`;
             result.push(string);
             strToken="";
         }
     }

     for(let i=0;i<result.length;i++){
         //输出结果
         console.log(result[i]);
     }
}

main();