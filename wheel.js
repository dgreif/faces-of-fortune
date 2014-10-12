$(function () {
    var wheel = wof.wheel = {},
        $wheel = $(".wheel"),
        machine,
        selfies = wheel.selfies = [],
        max = wheel.max = 5,
        setOutput = wof.setOutput;

    function iHaveASelfie () {
        var myIdFound = false;
        _.each(selfies, function(selfie) {
            if(selfie.id == wof.userId) {
                myIdFound = true;
            }
        });

        return myIdFound;
    }

    function showSelfieCount() {
        if(wheel.selfies.length >= wheel.max - 1 && !iHaveASelfie()) {
            setOutput("You need to Take A Selfie");
        } else {
            setOutput("Waiting for Selfies - " + wheel.selfies.length + "/" + wheel.max);
        }
    }

    wheel.showSelfieCount = showSelfieCount;

    function spinComplete ($el, result) {
        var winner = selfies[result.index];

        if(winner && winner.id == wof.userId) {
            setOutput("You WIN!!!!!!!");
        } else {
            setOutput("WAH WAH...you lose...");
        }

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
        setOutput("");
        $(".readyButtons").hide();
        machine.shuffle(3, spinComplete);
    };

    wheel.addSelfie = function(selfie) {
        if(selfies.length >= max) {
            return;
        }

        if(selfies.length >= max - 1 && selfie.id != wof.userId && !iHaveASelfie()) {
            showSelfieCount();
            return;
        }

        if(selfies.length < max) {
            selfies.unshift(selfie);
        }

        showSelfieCount();

        if(selfies.length >= max) {
            wheel.readyForSpin();
        }

        wheel.loadWheel();
    };

    wheel.selfieTaken = function() {
        if(selfies.length >= max) {
            selfies.length = [0];
            wheel.loadWheel();
        }
    };

    wheel.wait();
});