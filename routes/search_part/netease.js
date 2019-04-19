const crypto = require('crypto');
const encode = require('nodejs-base64-encode');

// 转为unicode 编码
function encodeUnicode(str) {
    var res = [];
    for ( var i=0; i<str.length; i++ ) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

// 解码
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}

function strToHexCharCode(str) {
    if (str === "")
        return "";
    let hexCharCode = [];
    hexCharCode.push("0x");
    for (let i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}

function hexCharCodeToStr(hexCharCodeStr) {
    let trimedStr = hexCharCodeStr.trim();
    let rawStr =
        trimedStr.substr(0, 2).toLowerCase() === "0x"
            ?
            trimedStr.substr(2)
            :
            trimedStr;
    let len = rawStr.length;
    if (len % 2 !== 0) {
        alert("Illegal Format ASCII Code!");
        return "";
    }
    let curCharCode;
    let resultStr = [];
    for (let i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}

function fix_data(length) {
    let temp = ""
    for (let i = 0; i < length; i++) {
        temp += " "
    }
    return temp
}

function encode_netease_data(param) {
    let str = JSON.stringify(param)
    str = str + fix_data(16 - str.length % 16)
    let key = hexCharCodeToStr("7246674226682325323F5E6544673A51")
    console.log(str, key, str.length)
    let encryptor = crypto.createCipheriv('AES-128-ECB', key, '')
    let temp = encryptor.update(str, "ascii", "hex")

    console.log(temp)
}

function spider(name, num) {
    console.log("netease", name, num)
    let param = {
        "method": "POST",
        "url": "http://music.163.com/api/cloudsearch/pc",
        "params": {"s": encodeUnicode(name), "type": 1, "offset": 0, "limit": num},
    }
    let data = {"eparams": encode_netease_data(param)}
}

module.exports = spider