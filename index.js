var wof = {};
$(function () {
    wof.loadWheel = function() {
        var params = {
                active	: 1,
                delay	: 450,
                auto	: 1000
            };

        wof.wheel = $(".wheel").slotMachine(params);
    };

    wof.setOutput = function(text) {
        $('#output').html(text);
    };

    wof.loadWheel();
});