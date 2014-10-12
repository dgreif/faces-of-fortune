$(function () {
    var util = wof.util,
        wheel = wof.wheel,
        server = wof.server = {},
        connection = $.connection('http://54.68.225.149/connect'),
        showSelfieCount = wheel.showSelfieCount;



    server.upload = function(img) {
        $.post("http://54.68.225.149/api/selfies", {
            id: wof.userId,
            img: util.htmlEscape(img)
        });
    };

    server.receive = function(data) {
        if(data && data.id && data.img) {
            data.id = util.htmlEscape(data.id);
            data.img = util.htmlEscape(data.img);
            wheel.addSelfie(data);
        }
    };

    server.init = function() {
        connection.received(server.receive);

        connection.start({ xdomain: true }).done(function() {
            showSelfieCount();
        });
    };

    server.init();
});