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
        lastSelfie,
        selfieSize = 250,
        errBack = function(error) {
            videoStarted = false;
            wof.setOutput("ERROR: Failed to start camera..try again");
            wof.closeCapture();
        };

    function uploadImage (img) {
        wof.wheel.selfieTaken();
        wof.setOutput("Uploading Selfie...");
        lastSelfie = img;
        wof.server.upload(img);
    }

    function cordovaCaptureSuccess (img64) {
        var img = "data:image/jpeg;base64," + img64;
        uploadImage(img);
    }

    function cordovaCaptureFail (img64) {
        // do nothing
    }

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
        // cordova camera plugin
        if(navigator.camera && navigator.camera.getPicture) {
            navigator.camera.getPicture(cordovaCaptureSuccess, cordovaCaptureFail, {
                quality: 90,
                targetWidth: selfieSize,
                targetHeight: selfieSize,
                correctOrientation: true,
                cameraDirection: Camera.Direction.FRONT,
                destinationType: Camera.DestinationType.DATA_URL
            });
        } else {
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
        }
    };

    wof.upload = function() {
        wof.closeCapture();
        var imgStr = canvas.toDataURL();
        uploadImage(imgStr);
    };

    wof.closeCapture = function() {
        captureOverlay.hide();
        wof.showVideo();
    };

    wof.capture = function() {
        var drawHeight = selfieSize,
            drawWidth = selfieSize,
            drawHeightOffset = 0,
            drawWidthOffset = 0,
            videoHeight = $video[0].videoHeight,
            videoWidth = $video[0].videoWidth;

        if(videoWidth > videoHeight) {
            drawHeight = selfieSize * videoHeight / videoWidth;
            drawHeightOffset = (selfieSize - drawHeight) / 2;
        } else {
            drawWidth = selfieSize * videoWidth / videoHeight;
            drawWidthOffset = (selfieSize - drawWidth) / 2;
        }

        context.drawImage(video, drawWidthOffset, drawHeightOffset, drawWidth, drawHeight);
        wof.showCaptured();
    };

    wof.useLastSelfie = function() {
        if(lastSelfie) {

        }
    };
});