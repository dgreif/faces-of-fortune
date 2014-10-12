$(function () {
    var wheel = wof.wheel = {},
        $wheel = $(".wheel"),
        machine,
        selfies = wheel.selfies = [],
        max = wheel.max = 5,
        setOutput = wof.setOutput;

    function showSelfieCount() {
        setOutput("Waiting for Selfies - " + wheel.selfies.length + "/" + wheel.max);
    }

    wheel.showSelfieCount = showSelfieCount;

    function spinComplete ($el, result) {
        var winner = selfies[result.index];

        if(winner && winner.id == wof.userId) {
            setOutput("You win!!!!!!!");
        } else {
            setOutput("WAH WAH...you lose...");
        }

        console.log(result);
        selfies.length = [0];
        wheel.wait();
    }

    wheel.loadWheel = function() {
        $wheel.empty();
        _.each(selfies, function(selfie) {
            var newImage = $('<img src="' + selfie.img + '">');
            newImage.data('id', selfie.id);
            $wheel.append(newImage);
        });

        var params = {
            delay: 450
        };

        machine = $(".wheel").slotMachine(params);
    };

    wheel.readyForSpin = function() {
        $(".readyButtons").show();
        $(".waitButtons").hide();
        setOutput("Ready to spin!");
    };

    wheel.wait = function () {
        $(".readyButtons").hide();
        $(".waitButtons").show();
    };

    wheel.spin = function () {
        $(".readyButtons").hide();
        machine.shuffle(3, spinComplete);
        wheel.wait();

    };

    wheel.addSelfie = function(data) {
        selfies.unshift(data);

        if(selfies.length >= max) {
            wheel.readyForSpin();
        } else {
            showSelfieCount();
            wheel.loadWheel();
        }
    };

    wheel.wait();
    //wheel.loadWheel();
});