let request = require('request')

function fetch_data(options) {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body)
            } else {
                reject("error")
            }
        });
    })

}

module.exports = fetch_data