const wordDetails = id => {
    fetch(wordDetailLink + id)
        .then(res => res.json())
        .then(json => {
            displayWordDetails(json.data)
        })
        .catch(err => console.log("error fetching data: ", err));
}
const displayWordDetails = data => {
    const modalContainer = document.getElementById("details-container");
    modalContainer.innerHTML = `
        <h1 class="text-2xl font-bold">${data.word} (<i class="fa-solid fa-microphone-lines"></i>:<span class="bangla">${data.pronunciation}</span>)</h1>
        <div class="space-y-1">
            <p class="font-bold">Meaning</p>
            <p class="bangla font-semibold">${data.meaning}</p>
        </div>
        <div class="space-y-1">
            <p class="font-bold">Example</p>
            <p class="bangla text-neutral/50">${data.sentence}</p>
        </div>
        <div class="space-y-1">
            <p class="bangla font-bold">সমার্থক শব্দ গুলো</p>
            ${data.synonyms.map(synonym =>
                `<p class="btn text-neutral/50 mx-1">${synonym}</p>`
            ).join('')}
        </div>
    `;
    word_detail_modal.showModal();
}