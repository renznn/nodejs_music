var express = require('express');
var router = express.Router();

let plat = [
    // require("./search_part/kugou"),
    require("./search_part/netease"),
    require("./search_part/qq"),
    require("./search_part/baidu"),
    require("./search_part/xiami")
]

/* GET home page. */
router.post('/', async function (req, res, next) {
    let req_data = req.body
    let list = []
    if (req_data) {
        for (let i = 0; i < plat.length; i++) {
            list[list.length] = await plat[i](req_data.name, req_data.num)
        }
    }
    res.send(list)
});

module.exports = router;
