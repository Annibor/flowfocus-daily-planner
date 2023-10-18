/*-----------------*/
/*-- CHECK LOCAL STORAGE -- */
/*------------------*/
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

console.log(itemsArray);

/*-----------------*/
/*-- ADD TO LIST -- */
/*-----------------*/

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

/*-- SHOW ON SCREEN -- */
function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += ` <div class="item">
    <div class="input-controller">
      <textarea disabled>${itemsArray[i]}</textarea>
      <div class="edit-conroller">
        <i class="fa-thin fa-check deleteBtn"></i>
        <i class="fa-thin fa-pen-to-square editBtn"></i>
      </div>
    </div>
    <div class="update-controller">
      <button class="saveBtn">Save</button>
      <button class="cancelBtn">Cancel</button>
    </div>
  </div> `;
  }
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
};
