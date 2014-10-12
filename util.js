var wof = {};
(function() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    wof.util = {
        newGuid: function() {
            return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        }
    };

    wof.util.htmlEscape = function (str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/t:/g, '');
    };

    wof.userId = wof.util.newGuid();

    wof.setOutput = function(text) {
        $('#output').html(text);
    };
})();