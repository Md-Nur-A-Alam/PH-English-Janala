const manageLoading = status => {
    status ? (
        document.getElementById("loading").classList.remove("hidden"),
        document.getElementById("lesson-content").classList.add("hidden")
    ) : (
        document.getElementById("loading").classList.add("hidden"),
        document.getElementById("lesson-content").classList.remove("hidden")
    );
}
function pronounceWord(word) {

    const voices = speechSynthesis.getVoices();
    const englishVoices = voices.filter(v => v.lang.startsWith("en"));
    const randomVoice =
        englishVoices[Math.floor(Math.random() * englishVoices.length)];

    const utterance = new SpeechSynthesisUtterance(`Hey learner! The word is ${word}. Repeat after me!`);
    utterance.voice = randomVoice;

    speechSynthesis.speak(utterance);
}
const notFound = () => {
    return `<span class="text-error text-md">Not found</span>`;
}
allLessons(allLessonsLink);