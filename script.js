s
const micButton = document.getElementById("micButton");
const statusText = document.getElementById("status");
const recognizedText = document.getElementById("recognizedText");



function speak(message) {

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(message);

        speech.rate = 0.9;

        speech.pitch = 1.2;

        speech.volume = 1;

        window.speechSynthesis.speak(speech);
    }
}




const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


let recognition;


if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;


    // When microphone starts
    recognition.onstart = function () {

        micButton.classList.add("listening");

        statusText.innerText =
            "🎤 I'm listening...";

        recognizedText.innerText =
            "Tell me what you want! 😊";

        speak("I'm listening. What would you like to search?");
    };


    // When speech is recognized
    recognition.onresult = function (event) {

        const text =
            event.results[0][0].transcript;

        recognizedText.innerText =
            "🗣️ " + text;

        statusText.innerText =
            "✨ I heard you!";


        processCommand(text);
    };


    // When microphone stops
    recognition.onend = function () {

        micButton.classList.remove("listening");

    };


    // Error
    recognition.onerror = function (event) {

        micButton.classList.remove("listening");

        statusText.innerText =
            "Oops! Let's try again 😊";

        recognizedText.innerText =
            "Please tap the microphone again.";

        console.log(event.error);
    };


} else {

    statusText.innerText =
        "Your browser does not support voice search.";

}




micButton.addEventListener("click", function () {

    if (!recognition) {

        alert(
            "Voice search is not supported. Please use Google Chrome or Microsoft Edge."
        );

        return;
    }


    try {

        recognition.start();

    } catch (error) {

        console.log(error);

    }

});



function processCommand(command) {

    const text =
        command.toLowerCase().trim();


    // YouTube search
    if (
        text.includes("youtube") ||
        text.includes("video") ||
        text.includes("cartoon") ||
        text.includes("nursery") ||
        text.includes("song") ||
        text.includes("music")
    ) {

        speak("Let's find some fun videos!");

        searchYouTube(
            removeWords(
                command,
                [
                    "search",
                    "youtube",
                    "video",
                    "videos",
                    "play",
                    "cartoon",
                    "music"
                ]
            )
        );

        return;
    }


    // Weather
    if (
        text.includes("weather")
    ) {

        speak("Let's check the weather!");

        searchWeb("weather today");

        return;
    }


    // Learning
    if (
        text.includes("learn") ||
        text.includes("learning") ||
        text.includes("study")
    ) {

        speak("Let's learn something new!");

        searchWeb(command + " for kids");

        return;
    }


    // Animals
    if (
        text.includes("animal") ||
        text.includes("animals") ||
        text.includes("dog") ||
        text.includes("cat") ||
        text.includes("elephant") ||
        text.includes("lion")
    ) {

        speak("Let's discover some amazing animals!");

        searchWeb(command + " for kids");

        return;
    }


    // Space
    if (
        text.includes("space") ||
        text.includes("planet") ||
        text.includes("rocket") ||
        text.includes("moon")
    ) {

        speak("Let's explore space!");

        searchWeb(command + " for kids");

        return;
    }


    // Normal web search
    speak("Let's search for that!");

    searchWeb(command);
}




function searchWeb(query) {

    if (!query || query.trim() === "") {

        query = "fun learning for kids";

    }


    const url =
        "https://www.google.com/search?q=" +
        encodeURIComponent(query);


    window.open(url, "_blank");
}




function searchYouTube(query) {

    if (!query || query.trim() === "") {

        query = "nursery rhymes for kids";

    }


    const url =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(query);


    window.open(url, "_blank");
}



function removeWords(text, words) {

    let result = text;

    words.forEach(function(word) {

        result = result.replace(
            new RegExp("\\b" + word + "\\b", "gi"),
            ""
        );

    });

    return result.trim();
}



function voiceExample(command) {

    recognizedText.innerText =
        "🗣️ " + command;

    statusText.innerText =
        "✨ Searching...";

    processCommand(command);
}



window.addEventListener("load", function () {

    setTimeout(function () {

        speak(
            "Hello little explorer! Tap the microphone and tell me what you want to discover."
        );

    }, 1000);

});