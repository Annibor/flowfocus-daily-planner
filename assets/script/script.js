/*jshint esversion: 6 */
/*-----------------*/
/*-- CHECK LOCAL STORAGE -- */
/*------------------*/
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

/*-----------------*/
/*-- AUDIO--*/
/*-----------------*/

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
        `<button class="dots__dot" data-slide="${i}"></button>`
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

/*-- WHEN CKLICKING THE BUTTON-- */
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

/*-- WHEN PRESSING ENTER BUTTON-- */
document.querySelector("#item").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item);
  }
});

/*-- SHOW ON SCREEN -- */
function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += ` <div class="item">
    <div class="input-controller">
      <textarea disabled class="itemsText">${itemsArray[i]}</textarea>
      <div class="edit-conroller">
        <i class="fa-solid fa-trash deleteBtn buttons"></i>
        <i class="fa-solid fa-pen-to-square editBtn buttons"></i>
        <i class="fa-solid fa-check doneBtn buttons"></i>
      </div>
    </div>
    <div class="update-controller">
      <button class="saveBtn buttons">Save</button>
      <button class="cancelBtn buttons">Cancel</button>
    </div>
  </div> `;
  }
  document.querySelector(".to-do-list").innerHTML = items;

  /*-- FOR EDIT & DELETE BUTTONS--*/
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
  activateDoneListeners();
}

/*-- FUNCTION FOR DELETE BUTTONS--*/
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

/*-- FUNCTION FOR EDIT BUTTONS--*/
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

/* FUNCTION FOR DONE BUTTONS */
function activateDoneListeners() {
  const doneBtn = document.querySelectorAll(".doneBtn");
  doneBtn.forEach((doneBtn, i) => {
    doneBtn.addEventListener("click", () => {
      const itemsText = document.querySelectorAll(".itemsText")[i];
      itemsText.classList.toggle("completed");
    });
  });
}

/*-- FUNCTION FOR SAVE BUTTONS--*/
function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

/*-- FUNCTION FOR CANCEL BUTTONS--*/
function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
    });
  });
}

/*-- FUNCTION FOR UPDATE ITEMS--*/
function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

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
  displayItems();
};
