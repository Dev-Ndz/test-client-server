/*****************
 * DELETE BUTTON
 ****************/

const deleteBtn = document.querySelector(".selected-task .delete-btn");
if (deleteBtn != null){
    deleteBtn.addEventListener('click', (e) => {
        console.log("clicked on delete");
        const endpoint = `/task/${deleteBtn.dataset.doc}`;

        fetch(endpoint, {method:'DELETE'})
            .then((response) => response.json())
                .then((data) => window.location.href = data.redirect)
            .catch((err)=>console.log(err));
    })
}

/************************
 * CHECK/UNCHECK BUTTONS
 ***********************/

const checkedBtnList = document.querySelectorAll(".checked");

checkedBtnList.forEach((checkedBtn)=> {

    checkedBtn.addEventListener('click', (e) => {
        console.log("clicked on checked");
        const endpoint = `/uncheck/${checkedBtn.dataset.doc}`;

        fetch(endpoint, {method:'PUT'})
            .then((response) => response.json())
                .then((data) => window.location.href = data.redirect)
            .catch((err)=>console.log(err));
    })
});


const uncheckedBtnList = document.querySelectorAll(".unchecked");

uncheckedBtnList.forEach((uncheckedBtn)=> {

    uncheckedBtn.addEventListener('click', (e) => {
        console.log("clicked on unchecked");
        const endpoint = `/check/${uncheckedBtn.dataset.doc}`;

        fetch(endpoint, {method:'PUT'})
            .then((response) => response.json())
                .then((data) => window.location.href = data.redirect)
            .catch((err)=>console.log(err));
    })
});
