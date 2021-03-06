var mongojs = require('mongojs');
var db = mongojs('mapReduceDB', ['sourceData', 'example3_results']);
var example3 = {};
example3.execute = function () {
    var mapper = function () {
        var hobbys = this.hobbies.split(',');
        for (i in hobbys) {
            emit(h[i], 1);
        }
    };

    var reducer = function (key, values) {
        var count = 0;
        for (index in values) {
            count += values[index];
        }

        return count;
    };

    db.sourceData.mapReduce(
        mapper,
        reducer, {
            out: "example3_results"
        }
    );

    db.example3_results.find(function (err, docs) {
        if (err) console.log(err);
        console.log("\n", docs);
    });

};

module.exports = example3;