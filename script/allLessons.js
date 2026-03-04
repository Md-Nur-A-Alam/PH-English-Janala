
let fullData = []; // To store the full 1000+ items
let currentPage = 1;
const itemsPerPage = 5;

document.getElementById("next-btn").addEventListener("click", () => {
    if (currentPage * itemsPerPage < fullData.length) {
        currentPage++;
        displayJson();
    }
});

document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayJson();
    }
});

const allLessons = link => {
    fetch(link)
        .then(res => res.json())
        .then(json => {
            fullData = json.data;
            displayJson()
        })
        .catch(err => console.log("error fetching data: ",err));
}
const displayJson=()=>{
    // 1. get the container
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML="";

    // Calculate which items to show
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = fullData.slice(start, end);

    // 2. access every lessons
    paginatedItems.forEach(data => {
        // 3. create a new div
        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML=`
        <button class="btn btn-primary btn-outline"><i class="fa-solid fa-book-open"></i> Lesson-${data.level_no}</button>
        `;
        lessonContainer.append(lessonDiv);
    });

    // Update the button states (Disable 'Prev' if on page 1, etc.)
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = end >= fullData.length;
}













allLessons("https://openapi.programming-hero.com/api/levels/all");