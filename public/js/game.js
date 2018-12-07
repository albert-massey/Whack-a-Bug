var moles;

$(document).ready(function () {

    // Global variables
    var slapSound = document.getElementById("slap");
    var gridSize = 36;
    var moleIndexes = [];
    var time = 0;
    var started = false;
    var lastClicked = -1;

    var difficulty = $(".activedifficulty").text().toLowerCase();

    $(document).on("click", ".btndifficulty", function () {
        difficulty = $(this).text().toLowerCase();
    })

    function setDifficulty(diffSet) {
        console.log(difficulty)
        switch (diffSet) {
            case "easy":
                moles = 6;
                break;
            case "medium":
                moles = 12;
                break;
            case "hard":
                moles = 18;
                break;
            case "plague":
                moles = gridSize;
                break;
            default:
                moles = 6;
        }
        $("#bugcount").text(moles);

        var firstLetter = diffSet[0].toUpperCase();
        diffSet = diffSet.slice(1);
        $("#difficulty").text(firstLetter + diffSet);
    }

    // Run program
    //-------------------------------------------------------
    function run() {
        if (!started) {
            setDifficulty(difficulty);
            placeMoles();
            start();
            started = true;
        }
    }

    $("#start-game-btn").on("click", function () {
        run();
    });

    $("#gameplay-instructions-btn").on("click", function () {
        started = false;
        lastClicked = -1;
        stop();
        reset();
        resetMoles();
    });
    //-------------------------------------------------------

    function randomize() {
        for (i = 0; i < moles; i++) {
            var rand = Math.floor(Math.random() * Math.floor(gridSize));
            if (moleIndexes.includes(rand) || rand === lastClicked) {
                i--;
            } else {
                moleIndexes.push(rand);
            }
        }
    }

    function placeMoles() {
        randomize();
        for (i = 0; i < moleIndexes.length; i++) {
            $("#" + moleIndexes[i]).attr("data-lit", "true").css("filter", "hue-rotate(0deg)");
            // console.log(moleIndexes[i]);
        }
    }

    function resetMoles() {
        for (i = 0; i < moleIndexes.length; i++) {
            $("#" + moleIndexes[i]).attr("data-lit", "false").css("filter", "hue-rotate(120deg) brightness(1.5) grayscale(30%)");
        }
        moleIndexes = [];
    }

    $(document).on("click", '[data-lit="true"]', function () {
        slapSound.play();
        lastClicked = parseInt($(this).attr("id"));
        moles--;
        $("#bugcount").text(moles);

        if (moles === 0) {
            $(this).attr("data-lit", "false").css("filter", "hue-rotate(120deg) brightness(1.5) grayscale(30%)");
            stop();
            console.log("Time: " + $("#timer").text());
            console.log("WIN");
        } else {
            resetMoles();
            placeMoles();
        }
    });

    $(document).on("click", '[data-lit="false"]', function () {
        time += 100;
        console.log("TIME PENALTY");
    });

    //-----------------------------------------------------------------------------
    // Stopwatch code
    //-----------------------------------------------------------------------------

    function reset() {
        time = 0;
        $("#timer").text("00:00.00");
    }

    function start() {
        intervalId = setInterval(count, 10);
    }

    function stop() {
        console.log("stopping");
        clearInterval(intervalId);
    }

    function count() {
        time++;
        var converted = timeConverter(time);
        $("#timer").text(converted);
    }

    function timeConverter(t) {
        var minutes = Math.floor(t / 6000);
        var seconds = Math.floor(t / 100) - (minutes * 60);
        var hundredths = (t - (seconds * 100)) - (minutes * 6000);

        if (hundredths < 10) {
            hundredths = "0" + hundredths;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds + "." + hundredths;
    }

});
