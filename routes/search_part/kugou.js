let fetch = require('../request')

async function spider(name, num) {
    // console.log("kugou", name, num)
    let url = "http://songsearch.kugou.com/song_search_v2"
    let options = {
        url: url,
        method: "GET",
        qs: {
            callback: "jQuery112407470964083509348_1534929985284",
            keyword: name,
            page: 1,
            pagesize: num,
            userid: -1,
            clientver: "",
            platform: "WebFilter",
            tag: "em",
            filter: 2,
            iscorrection: 1,
            privilege_filter: 0,
            _: 1534929985286
        },
        headers: {
            "content-type": "text/plain; charset=utf-8",
        }
    }
    let temp = await fetch(options)
    temp = JSON.parse(temp.substring(temp.indexOf('(') + 1, temp.length - 2))
    let data = []
    if (temp.data && temp.data.lists) {
        for (let i = 0; i < temp.data.lists.length; i++) {
            // console.log(temp.data.lists[i])
            let info = await fetch({
                url: "http://www.kugou.com/yy/index.php",
                method: "GET",
                qs: {
                    r: "play/getdata",
                    hash: temp.data.lists[i]['FileHash']
                }
            })
            info = JSON.parse(info)
            if (info && info.data) {
                data[data.length] = {
                    name: info.data.audio_name,
                    url: info.data.play_url,
                    // info: info
                }
            }
        }
    }
    return data
}

module.exports = spider