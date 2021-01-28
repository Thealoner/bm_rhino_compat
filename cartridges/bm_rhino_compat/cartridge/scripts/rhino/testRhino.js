/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
var testers = require('./testers.json');
var versions = Object.keys(testers);

// This function is needed to run the tests and was extracted from:
// https://github.com/kangax/compat-table/blob/gh-pages/node.js
this.__createIterableObject = function (arr, methods) {
    methods = methods || {};

    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return {};
    }

    arr.length++;

    var iterator = {
        next: function () {
            return {
                value: arr.shift(),
                done: arr.length <= 0
            };
        },
        return: methods.return,
        throw: methods.throw
    };

    var iterable = {};

    iterable[Symbol.iterator] = function () {
        return iterator;
    };

    return iterable;
};

function runSync(script) {
    try {
        // eslint-disable-next-line no-new-func
        var fn = new Function(script);
        return fn() || false;
    } catch (e) {
        return e.message;
    }
}

function run(script, cb) {
    // kangax's Promise tests reply on a asyncTestPassed function.
    var async = /asyncTestPassed/.test(script);

    if (async) {
        // skip because async is not supported
        return cb('Skipping. Async is not supported');
    } else {
        var result = runSync(script);

        return cb(result);
    }
}

function next(ver) {
    if (!ver) {
        return null;
    }

    var completed = 0;
    var results = {
        _successful: 0,
        _unsuccessful: 0,
        _count: Object.keys(testers[ver]).length,
        _percent: 0
    };

    Object.keys(testers[ver]).forEach(function (name) {
        var script = testers[ver][name].code;
        results[name] = {
            result: false
        };

        run(script, function (result) {
            // expected results: `e.message` or true/false
            results[name].result = typeof result === 'string' ? result : !!result;

            if (results[name].result === true) {
                results._successful++;
            } else {
                results._unsuccessful++;
            }

            results[name].code = testers[ver][name].code;
            results[name].spec = testers[ver][name].spec;

            results._completed = completed;

            if (++completed === results._count) {
                results._percent = results._successful / results._count;
            }
        });
    });

    return results;
}

function getTestResults() {
    var rawResults = {};
    var results = {};
    var summary = {};

    versions.forEach(function (version) {
        rawResults[version] = next(version);

        Object.keys(rawResults[version]).forEach(function (result) {
            if (result.substring(0, 1).equals('_')) {
                if (!(version in summary)) {
                    summary[version] = {};
                }

                summary[version][result] = rawResults[version][result];

                return;
            }

            if (!(version in results)) {
                results[version] = {};
            }

            var path = result.split('›'); // syntax›default function parameters›separate scope

            if (path.length < 3) {
                path.push(path[1]); // a hack for testers like "annex b›HTML-style comments"
            }

            var pointer = results[version];
            var pathStep = null;

            for (var i = 0; i < path.length - 1; i++) {
                pathStep = path[i];

                if (!(pathStep in pointer)) {
                    pointer[pathStep] = {};
                }

                pointer = pointer[pathStep];
            }

            pathStep = path[path.length - 1];
            pointer[pathStep] = rawResults[version][result];
        });
    });

    return {
        results: results,
        summary: summary
    };
}

module.exports = {
    getTestResults: getTestResults
};
