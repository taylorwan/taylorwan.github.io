var stateData = {};

$(function() {
    var data = loadData("js/Environment-min.json");
    stateData.draw("#mapsvg", data, tooltipHtml);
});

function loadData(path) {

    // read in file
    raw = readJSON(path);
    var d = initStates();

    // max value of the variable that helps us color the map
    // (currently hardcoded)
    var max = 774;

    // load our object with necessary info
    for (var k in raw) {
        var newK = k.toUpperCase();
        d[newK] = {
            total_count: raw[k].total_count,
            total_bills: raw[k].total_bills,
            color: d3.interpolate("#fff", "#7b5384")(raw[k].total_count / max)
        };
    }

    return d;
}

/* returns an object with "0" as data for all states */
function initStates() {
    states = ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
        "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
        "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
        "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
        "WI", "MO", "AR", "OK", "KS", "LS", "VA"
    ];
    d = {};
    states.forEach(function(s) {
        d[s] = {
            total_count: 0,
            total_bills: 0,
            color: "#fff"
        };
    });
    return d;
}

/* loads json from a file */
function readJSON(path) {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': path,
        'dataType': "json",
        'success': function(d) {
            json = d;
        }
    });
    return json;
}

function tooltipHtml(n, d) { /* function to create html content string in tooltip div. */
    return "<h4>" + n + "</h4><table>" +
        "<tr><td>All Bills</td><td>" + (d.total_bills) + "</td></tr>" +
        "<tr><td>Environmental</td><td>" + (d.total_count) + "</td></tr>" +
        "</table>";
}


