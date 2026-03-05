
let fullWordData = []; // To store the full 1000+ items
let currentWordPage = 1;
const itemsWordPerPage = 12;

document.getElementById("next-content-btn").addEventListener("click", () => {
    if (currentWordPage * itemsWordPerPage < fullWordData.length) {
        currentWordPage++;
        displayWordLesson();
    }
});

document.getElementById("prev-content-btn").addEventListener("click", () => {
    if (currentWordPage > 1) {
        currentWordPage--;
        displayWordLesson();
    }
});

document.getElementById("lesson-container").addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) {
        console.log("not clicked");
        const unselect = document.getElementById("unselect-lesson");
        unselect.classList.remove("hidden");
        document.getElementById("word-pagination").classList.add("hidden");
        document.getElementById("not-exist-lesson").classList.add("hidden");
        return;
    };
    const unselect = document.getElementById("unselect-lesson");
    unselect.classList.add("hidden");
    document.getElementById("word-pagination").classList.remove("hidden");

    const level = btn.dataset.level;
    if (!level) return;
    fetch(wordListsLink + level)
        .then(res => res.json())
        .then(json => {
            fullWordData = json.data;
            currentWordPage = 1;

            if (fullWordData.length === 0) {
                document.getElementById("not-exist-lesson").classList.remove("hidden");
                document.getElementById("actual-lesson").innerHTML = "";
                document.getElementById("word-pagination").classList.add("hidden");
                return;
            }

            document.getElementById("not-exist-lesson").classList.add("hidden");

            displayWordLesson();
        })
        .catch(err => console.log("error fetching data: ", err));

});

const displayWordLesson = () => {
    const wordsContainer = document.getElementById("actual-lesson");
    wordsContainer.innerHTML = "";

    const st = (currentWordPage - 1) * itemsWordPerPage;
    const ed = st + itemsWordPerPage;
    const pagination = fullWordData.slice(st, ed);

    pagination.forEach(data => {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
                        <div class="bg-white rounded-md shadow-md p-6 max-w-sm w-full">
                            <p class="mb-5 font-bold text-xl">${data.word}</p>
                            <p class="mb-5">Meaning/Pronunciation</p>
                            <p class="mb-5 bangla font-bold">"${data.meaning}/${data.pronunciation}"</p>
                            <div class="flex justify-between">
                                <button class="btn btn-neutral btn-soft"><i class="fa-solid fa-circle-info"></i></button>
                                <button class="btn btn-neutral btn-soft"><i class="fa-solid fa-volume-high"></i></button>
                            </div>
                        </div>
        `;
        wordsContainer.append(wordDiv);
    })


    document.getElementById('prev-content-btn').disabled = currentWordPage === 1;
    document.getElementById('next-content-btn').disabled = ed >= fullWordData.length;
}
curr