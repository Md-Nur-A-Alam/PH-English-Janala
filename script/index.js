const manageLoading = status =>{
    status?(
        document.getElementById("loading").classList.remove("hidden"),
        document.getElementById("lesson-content").classList.add("hidden")
    ):(
        document.getElementById("loading").classList.add("hidden"),
        document.getElementById("lesson-content").classList.remove("hidden")
    );
}
const notFound=()=>{
    return `<span class="text-error text-md">Not found</span>`;
}
allLessons(allLessonsLink);