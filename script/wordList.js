
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
    manageLoading(true);
    const btn = event.target.closest("button");
    if (!btn) {
        console.log("not clicked");
        const unselect = document.getElementById("unselect-lesson");
        unselect.classList.remove("hidden");
        document.getElementById("word-pagination").classList.add("hidden");
        document.getElementById("not-exist-lesson").classList.add("hidden");
        manageLoading(false);
        return;
    };
    const lessonBtn = document.querySelectorAll('#lesson-container button');
    lessonBtn.forEach(btn => {
        btn.classList.add('btn-outline');
    });
    const input = document.getElementById("search-input");
    input.value = "";
    input.blur();
    btn.classList.remove('btn-outline');
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
                manageLoading(false);
                return;
            }

            document.getElementById("not-exist-lesson").classList.add("hidden");

            displayWordLesson();
        })
        .catch(err => {manageLoading(false);console.log("error fetching data: ", err)});

});

const displayWordLesson = (prem=fullWordData) => {
    const wordsContainer = document.getElementById("actual-lesson");
    wordsContainer.innerHTML = "";

    const st = (currentWordPage - 1) * itemsWordPerPage;
    const ed = st + itemsWordPerPage;
    const pagination = prem.slice(st, ed);

    pagination.forEach(data => {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
                        <div class="bg-white rounded-md shadow-md p-6 md:max-w-sm w-full h-full flex flex-col justify-between">
                            <p class="mb-5 font-bold text-xl">${data.word?data.word:notFound()}</p>
                            <p class="mb-5">Meaning/Pronunciation</p>
                            <p class="mb-5 bangla font-bold">"${data.meaning?data.meaning:notFound()}/${data.pronunciation?data.pronunciation:notFound()}"</p>
                            <div class="flex justify-between">
                                <button onclick="wordDetails(${data.id})" class="btn btn-neutral btn-soft"><i class="fa-solid fa-circle-info"></i></button>
                                <button class="btn btn-neutral btn-soft"><i class="fa-solid fa-volume-high"></i></button>
                            </div>
                        </div>
        `;
        wordsContainer.append(wordDiv);
        // console.log(data.id);
        manageLoading(false);
    });


    document.getElementById('prev-content-btn').disabled = currentWordPage === 1;
    document.getElementById('next-content-btn').disabled = ed >= fullWordData.length;
}


document.getElementById("search-btn").addEventListener("click",()=>{
    manageLoading(true);
    const lessonBtn = document.querySelectorAll('#lesson-container button');
    lessonBtn.forEach(btn => {
        btn.classList.add('btn-outline');
    });
    const Input = document.getElementById("search-input");
    const searchInput = Input.value.trim().toLowerCase();
    fetch(allWordsList)
        .then(res => res.json())
        .then(json=>{
            const data = json.data;
            const filterWords = data.filter(wordObj => wordObj.word.toLowerCase().includes(searchInput))
            currentWordPage = 1;

            if (filterWords.length === 0) {
                document.getElementById("not-exist-lesson").classList.remove("hidden");
                document.getElementById("actual-lesson").innerHTML = "";
                document.getElementById("word-pagination").classList.add("hidden");
                manageLoading(false);
                return;
            }

            document.getElementById("not-exist-lesson").classList.add("hidden");

            displayWordLesson(filterWords);
        })
        .catch(err => {manageLoading(false);console.log("error fetching data: ", err)});

})