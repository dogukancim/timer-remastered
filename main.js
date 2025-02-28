document.addEventListener("DOMContentLoaded", function () {
    let timerDisplay = document.getElementById("timer");
    let start = document.getElementById("start");
    let reset = document.getElementById("reset");
    let pause = document.getElementById("pause");
    let resume = document.getElementById("resume");
    let minutesInput = document.getElementById("minutes");
    let timeisup = document.getElementById("timeisup");

    function elementStatus(v1, v2) {
        if (v1 != null && v2 != null) {
            if (v2 == true) {
                v1.hidden = false;
            } else if (v2 == false) {
                v1.hidden = true;
            } else {
                console.error("Wrong function call.");
            }
        } else {
            console.error("Wrong function call.");
        }
    }

    var permission = Notification.requestPermission();

    function sendNotification(v1, v2) {
        new Notification(v1, { body: v2 });
    }


    let timerInterval;
    let remainingTime = 0;

    elementStatus(timer, false);
    elementStatus(reset, false);
    elementStatus(pause, false);
    elementStatus(resume, false);
    elementStatus(minutesInput, true);
    elementStatus(timeisup, false);

    function startTimer(duration) {
        let timer = duration * 60 + remainingTime;
        let minutes, seconds;

        timerInterval = setInterval(function () {
            minutes = Math.floor(timer / 60);
            seconds = timer % 60;

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            timerDisplay.textContent = minutes + ':' + seconds;

            if (--timer < 0) {
                clearInterval(timerInterval);
                remainingTime = 0;
                elementStatus(pause, false);
                elementStatus(resume, false);
                elementStatus(timerDisplay, false);
                elementStatus(minutesInput, false);
                elementStatus(start, false);
                elementStatus(reset, true);
                elementStatus(timeisup, true);
                sendNotification("Timer Remastered", "The timer you set expired.");
            }
        }, 1000);
    }

    start.addEventListener('click', function () {
        let minutes = parseInt(minutesInput.value);
        if (Number.isInteger(minutes) == true && minutes > 0) {
            elementStatus(timer, true);
            elementStatus(reset, true);
            elementStatus(pause, true);
            elementStatus(start, false);
            elementStatus(resume, false);
            elementStatus(minutesInput, false);
            startTimer(minutes);
        } else {
            console.log("Please enter a valid number.");
        }
    });

    reset.addEventListener('click', function () {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00';
        remainingTime = 0;
        elementStatus(timer, false);
        elementStatus(reset, false);
        elementStatus(pause, false);
        elementStatus(start, true);
        elementStatus(resume, false);
        elementStatus(minutesInput, true);
        elementStatus(timeisup, false);
    });
    
    pause.addEventListener('click', function () {
        if(timerInterval == 0) {
            return true;
        } else {
            clearInterval(timerInterval);
            remainingTime = parseInt(timerDisplay.textContent.split(':')[0]) * 60 + parseInt(timerDisplay.textContent.split(':')[1]);
            elementStatus(pause, false);
            elementStatus(resume, true);
        }
    });
    
    resume.addEventListener('click', function () {
        startTimer(0);
        elementStatus(pause, true);
        elementStatus(resume, false);
    });
});