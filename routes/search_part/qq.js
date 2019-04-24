let fetch = require('../request')

// 转为unicode 编码
function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}

function binaryToStr(str) {
    var result = [];
    var list = str.split(" ");
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var asciiCode = parseInt(item, 2);
        var charValue = String.fromCharCode(asciiCode);
        result.push(charValue);
    }
    return result.join("");
}

async function spider(name, num) {
    console.log("qq", name, num)
    let url = "http://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp"
    let header = {
        "referer": "http://m.y.qq.com",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
    }
    let options = {
        url: url,
        method: "GET",
        qs: {"w": name, "format": "json", "p": 1, "n": num},
        headers: header
    }
    let temp = await fetch(options)
    temp = JSON.parse(temp)
    let data = []
    let guid = Math.floor((Math.random() * 10 + 1) * 1000000000)
    if (temp && temp.data && temp.data && temp.data.song.list) {
        let list = temp.data.song.list
        let uid_options = {
            url: "http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg",
            method: "GET",
            qs: {"guid": guid, "format": "json", "json": 3},
            headers: header
        }
        let uid_temp = await fetch(uid_options)
        uid_temp = JSON.parse(uid_temp)
        let key = uid_temp.key
        for (let i = 0; i < list.length; i++) {
            console.log(list[i].songmid)
            let song_url="http://dl.stream.qqmusic.qq.com/C400"+list[i].songmid+".m4a?" + "vkey=" +key+ "guid="+guid+ "fromtag=66"
            console.log(song_url)
        }
    }
    return data
}

module.exports = spider