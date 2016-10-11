
let  variable = [];
let  number = [];
let  retainPos;
 let symbolPos;
function isBlank(char) {
    if (char == 32) {
        return true;
    }
    return false;
}

function isLetter(char) {
    if ((char >= 65 && char <= 90) || (char >= 97 && char <= 122)) {
        return true;
    }
    return false;
}

function isDigit(char) {
    if (char >= 48 && char <= 57) {
        return true;
    }
    return false;
}

function isSymbol(symbol,strToken) {
    for(let i=0;i<symbol.length;i++){
        if(strToken===symbol[i]){
          symbolPos=36+i;
            return true;
        }
    }
    return false;
}

function getRetainWord(retainWord,strToken){

    for(let i=0;i<retainWord.length;i++){
        if(strToken===retainWord[i]){
           retainPos=i;
            return true;
        }
    }

    return false;
}

function type(number,variable,strToken) {
    for(let i=0;i<number.length;i++){
        if(number[i]===strToken)
            return 1;
    }

    for(let i=0;i<variable.length;i++){
        if(variable[i]===strToken)
            return 2;
    }

    return 0;
}

function main() {
    let strToken = "";    //存放构成单词符号的字符串

    const retainWord = ["main",
        "auto", "short", "int", "long", "float", "double", "char", "struct"
        , "union", "enum", "typedef", "const", "unsigned", "signed", "extern", "register"
        , "static", "volatile", "void", "if", "else", "switch", "case", "for"
        , "do", "while", "goto", "continue", "break", "default", "sizeof", "return"];
    //变量名表和常数表在词法分析过程中建立
    const symbol=[ "=","+","-","*","/","++","--","+=","-=",
        "*=","/=","==","!=",">","<",">=","<=","(",
        ")","[","]","{","}",",",":",";"];

    const inputString="int main ( ) { int a = 1 ; int b = 3 ; int sum = a + b ; }";
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
         }else if(type(number,variable,strToken)===1){
             console.log("('" + 34 + "','" + strToken + "')");
         }else if(type(number,variable,strToken)===2){
             console.log("('" + 33 + "','" + strToken + "')");
         }else if(getRetainWord(retainWord,strToken)){
             console.log("('" + retainPos + "','" +strToken+ "')");
         }else if(isSymbol(symbol,strToken)){
             console.log("('" +symbolPos + "','" +strToken+ "')");
         }else{
             strToken="";
         }
     }
}

main();