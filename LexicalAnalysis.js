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

function reserve(strToken, retainWord) {
    for (let i = 0; i < retainWord.length; i++) {
        if (strToken === retainWord[i]) {
            return 1;
        }
    }
    if (strToken.length != 0) {
        if (strToken.charAt(0) >= '0' && strToken.charAt(0) <= '9') {
            return 3;
        }
    }
    return 2;
}

function retract(strToken, retainWord) {
    const code = reserve(strToken, retainWord);
    if (code == 1) {
        console.log("('" + 1 + "','" + strToken + "')");
    } else if (code == 2) {
        console.log("('" + 2 + "','" + strToken + "')");
    }
    else if (code == 3) {
        console.log("('" + 3 + "','" + strToken + "')");
    }
    strToken.replace(strToken, '');
}

function main() {
    let strToken = "";
    const retainWord = ["int", "if", "else", "return", "main", "void", "while", "break"];
    let inputString = "int main(){int a = 1;int b >= 2;int sum == a + b;}";
    const stringArray = inputString.split("");
    for (let i = 0; i < stringArray.length; i++) {
        let unicode = stringArray[i].charCodeAt();
        let char = stringArray[i];
        if (isBlank(unicode) == false) {
            if (isLetter(unicode)) {
                if (isLetter(unicode) == true || isDigit(unicode) == true) {
                    strToken = strToken.concat(char);
                }
            } else if (isDigit(unicode)) {
                strToken = strToken.concat(char);
            } else if (unicode == 61) {
                if ((strToken.length != 0 ) && (strToken.charAt(0) == '=')) {
                    strToken = strToken.concat(char);
                    console.log("('" + 4 + "','" + strToken + "')");
                    strToken.replace(strToken, '');
                } else {
                    strToken = strToken.concat(char);
                }
            } else if (unicode == 43 || unicode == 45 || unicode == 42 || unicode == 47) {
                retract(strToken, retainWord);
                console.log("('" + 4 + "','" + char + "')");
            } else if (char == ';' || char == '(' || char == ')' || char == '{' || char == '}' || char == ',') {
                retract(strToken, retainWord);
                console.log("('" + 5 + "','" + char + "')");
                strToken = "";
            }
        } else {
            retract(strToken, retainWord);
            strToken = "";
        }
    }
}

main();