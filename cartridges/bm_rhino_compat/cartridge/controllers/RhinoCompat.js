
var server = require('server');

server.get('Show', function (req, res, next) {
    var testRhino = require('*/cartridge/scripts/rhino/testRhino');

    var testResults = testRhino.getTestResults();

    res.render('rhinoCompat/rhinoFancy', {
        results: testResults.results,
        summary: testResults.summary
    });
    next();
});

module.exports = server.exports();
