$(function() {
    var captureOverlay = $("#imgCapture"),
        canvas = document.getElementById("canvas"),
        $canvas = $("#canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        $video = $("#video"),
        videoObj = { "video": true },
        $captureButtons = $("#capturedButtons"),
        $videoButtons = $("#videoButtons"),
        videoStarted = false,
        errBack = function(error) {
            videoStarted = false;
            wof.setOutput("ERROR: Failed to start camera..try again");
            wof.closeCapture();
        };

    wof.showVideo = function() {
        $video.show();
        $videoButtons.show();
        $canvas.hide();
        $captureButtons.hide();
    };

    wof.showCaptured = function() {
        $video.hide();
        $videoButtons.hide();
        $canvas.show();
        $captureButtons.show();
    };

    wof.showCapture = function () {
        wof.showVideo();
        captureOverlay.show();

        if(!videoStarted) {
            // Put video listeners into place
            if(navigator.getUserMedia) { // Standard
                navigator.getUserMedia(videoObj, function(stream) {
                    video.src = stream;
                    video.play();
                }, errBack);
            } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
                navigator.webkitGetUserMedia(videoObj, function(stream){
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }
            else if(navigator.mozGetUserMedia) { // Firefox-prefixed
                navigator.mozGetUserMedia(videoObj, function(stream){
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }

            videoStarted = true;
        }
    };

    wof.upload = function() {
        wof.closeCapture();
        wof.setOutput("Uploading picture...");
        var imgStr = canvas.toDataURL();
        $('img').attr('src', imgStr);
    }

    wof.closeCapture = function() {
        captureOverlay.hide();
        wof.showVideo();
    }

    wof.capture = function() {
        context.drawImage(video, 0, 0, 250, 250);
        wof.showCaptured();
    }
});