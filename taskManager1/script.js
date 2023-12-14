document.querySelectorAll(".introduction-createButton")[0].addEventListener("click",function(){
    if (document.querySelectorAll(".taskCreatorWrapper")[0].classList[1]) {
        document.querySelectorAll(".taskCreatorWrapper")[0].classList.remove("taskCreatorWrapperActive");
    } else {
        document.querySelectorAll(".taskCreatorWrapper")[0].classList.add("taskCreatorWrapperActive")
    }
})