
var server = require('server');

server.get('Show', function (req, res, next) {
    var System = require('dw/system/System');
    var testRhino = require('*/cartridge/scripts/rhino/testRhino');

    var rawCompatibilityMode = System.getCompatibilityMode();
    var compatibilityMode = (rawCompatibilityMode / 100).toFixed(0) + '.' + (rawCompatibilityMode % 100).toString();
    var testResults = testRhino.getTestResults();

    res.render('rhinoCompat/rhinoFancy', {
        compatibilityMode: compatibilityMode,
        results: testResults.results,
        summary: testResults.summary
    });

    next();
});

module.exports = server.exports();
