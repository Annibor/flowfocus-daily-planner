/*jshint esversion: 6 */
/*exported deleteitem, editItem, deleteItem,saveItem, cancelEdit, itemDone*/

/*-----------------*/
/*-- CHECK LOCAL STORAGE -- */
/*------------------*/
const itemsArray = localStorage.getItem("items")? JSON.parse(localStorage.getItem("items"))
  : [];

/*-----------------*/
/*-- SLIDER TIPS -- */
/*-----------------*/
/*-- The slider is based on Jonas Schmedtmann Bankist, link in README --*/
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  /*-- SLIDE BTNS -- */
  const leftBtn = document.querySelector(".slider__btn--left");
  const rightBtn = document.querySelector(".slider__btn--right");
  /*-- SLIDE DOTS -- */
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const slideMax = slides.length;

  /*-- FUNCTIONS --*/
  /*-- CREATE DOTS -- */
  const createDots = function () {
    slides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button aria-label="dots showing what slide your on" class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  /*-- ACTIVE DOT -- */
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  /*-- SLIDE BTNS FUNCTION NEXT SLIDE-- */
  const nextSlide = function () {
    if (currentSlide === slideMax - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  /*-- SLIDE BTNS FUNCTION PREVIOUS SLIDE-- */
  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = slideMax - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  /*-- INIT DOTS -- */
  const init = function () {
    goToSlide(0);
    createDots();
    /*-- MAKE ACTIVE DOT OPEN PAGE-- */
    activateDot(0);
  };
  init();

  /*-- EVENTLISTENERS FOR SLIDE-- */
  rightBtn.addEventListener("click", nextSlide);
  leftBtn.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/*-----------------*/
/*-- ADD TO LIST -- */
/*-----------------*/
/* THIS TO DO LIST FUNCTIONS ARE BASED ON WEB DEV TUTORIALS, MEDIUM.COM TUTORIAL," BUILD A TODO LIST APP IN HTML CSS JAVASCRIPT EASY BEGINNER TUTORIALl", LINKS IN README */

/* -- QUERY SELECTORS -- */
const enterBtn = document.querySelector("#enter");
const itemInput = document.querySelector("#item");
const toDoList = document.querySelector(".to-do-list");

/*-- INITIALIZE THE TO-DO LIST --*/
function initializeToDoList() {
  toDoList.innerHTML = ""; 
  itemsArray.forEach((item, index) => {
    newToDoItem(item, index); 
  });
}

/*-- FUNCTION TO APPEND A TO-DO ITEM TO THE LIST --*/
function newToDoItem(text, index) {
  const toDoItem = document.createElement("div");
  toDoItem.className = "item";
  toDoItem.innerHTML = `
    <div class="input-controller">
      <textarea disabled aria-label="Write items for to-do list" class="itemsText">${text}</textarea>
      <div class="edit-controller">
        <i aria-label="Mark as done button" class="fa-solid fa-check doneBtn buttons" onclick="itemDone(${index})"></i>
        <i aria-label="Delete button" class="fa-solid fa-trash deleteBtn buttons" onclick="deleteItem(${index})"></i>
        <i aria-label="Edit button" class="fa-solid fa-pen-to-square editBtn buttons" onclick="editItem(${index})"></i>
      </div>
    </div>
    <div class="update-controller" style="display: none;">
      <button aria-label="Save button" class="saveBtn buttons" onclick="saveItem(${index})">Save</button>
      <button aria-label="Cancel edit button" class="cancelBtn buttons" onclick="cancelEdit(${index})">Cancel</button>
    </div>
  `;
  toDoList.appendChild(toDoItem);
}

/*-- FUNCTION TO CREATE A NEW TO-DO ITEM --*/
function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  initializeToDoList();
  item.value = "";
}

/*-- FUNCTION TO DELETE A TO-DO ITEM --*/
function deleteItem(index) {
  itemsArray.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  initializeToDoList();
}

/*-- FUNCTION TO EDIT A TO-DO ITEM --*/
function editItem(index) {
  const editController = document.querySelectorAll(".edit-controller")[index];
  const updateController =
    document.querySelectorAll(".update-controller")[index];
  const itemsText = document.querySelectorAll(".itemsText")[index];

  editController.style.display = "none";
  updateController.style.display = "block";
  itemsText.disabled = false;
}

/*-- FUNCTION TO SAVE CHANGES TO A TO-DO ITEM --*/
function saveItem(index) {
  const itemsText = document.querySelectorAll(".itemsText")[index];
  itemsArray[index] = itemsText.value;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  initializeToDoList();
}

/*-- FUNCTION TO CANCEL EDITING A TO-DO ITEM --*/
function cancelEdit(index) {
  const editController = document.querySelectorAll(".edit-controller")[index];
  const updateController =
    document.querySelectorAll(".update-controller")[index];
  const itemsText = document.querySelectorAll(".itemsText")[index];

  editController.style.display = "block";
  updateController.style.display = "none";
  itemsText.disabled = true;
}

/*-- FUNCTION TO MARK A TO-DO ITEM AS DONE --*/
function itemDone(index) {
  const itemsText = document.querySelectorAll(".itemsText")[index];
  itemsText.classList.toggle("completed");
}

/*-- INITIALIZE THE TO-DO LIST AND EVENT LISTENERS --*/
initializeToDoList();
enterBtn.addEventListener("click", () => {
  createItem(itemInput);
});
itemInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") createItem(itemInput);
});

/*-----------------*/
/*-- DISPLAY DATE -- */
/*------------------*/
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displayDate();
};
