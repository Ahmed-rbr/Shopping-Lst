const form = document.querySelector(".form");
const itemList = document.getElementById("item-list");
const filter = document.getElementById("filter");
const subBtn = document.querySelector(".btn");
const subBtnIcon = subBtn.querySelector("i");
const ClearBtn = document.querySelector(".btn-clear");
const itemInput = form.querySelector(".form-input");
let isEdite = false;
let editId = null;
let iteams = [];
const storedItems = localStorage.getItem("iteams");
iteams = storedItems ? JSON.parse(storedItems) : [];

const addIteamToList = () => {
  const formData = new FormData(form);

  for (let [name, value] of formData.entries()) {
    value = value.trim();

    if (value === "") {
      alert("Please enter a value");
      return;
    }

    if (isEdite) {
      storeEditeItem(value);
    } else {
      creatIteam(value);
    }
  }

  form.reset();
};
const storeEditeItem = (value) => {
  const index = iteams.findIndex((iteam) => iteam.id === editId);
  if (index !== -1) {
    iteams[index].value = value;
  }
  localStorage.setItem("iteams", JSON.stringify(iteams));
  initializePage();
  isEdite = false;
  editId = null;

  subBtn.style.background = "#333";
  subBtn.textContent = "Add item";
  console.log(subBtn.childNodes);
};

const editIteam = (e) => {
  if (e.target.classList.contains("noIteam")) return;

  if (e.target.tagName === "LI") {
    const targetItem = e.target;
    const id = targetItem.dataset.id;
    isEdite = true;
    editId = id;
    itemInput.value = targetItem.querySelector("span").textContent.trim();
    subBtn.style.background = "green";

    subBtn.textContent = "Edit item";

    subBtn.style.background = "green";
    targetItem.firstChild.style.background = "#fceeee";
    console.log(subBtn.childNodes);
  }
};
const showFeedBack = () => {
  const noItemsMessage = itemList.querySelector(".noIteam");

  if (!noItemsMessage) {
    if (iteams.length === 0) {
      const noItemsMessage = document.createElement("li");
      noItemsMessage.classList.add("noIteam");
      noItemsMessage.textContent = "no items";
      itemList.appendChild(noItemsMessage);
    }
  } else {
    if (noItemsMessage) {
      noItemsMessage.remove();
    }
  }
};

const filterResult = () => {
  const filterValue = filter.value.trim().toLowerCase();

  const listItems = Array.from(itemList.children);
  if (filterValue === "") {
    listItems.forEach((item) => {
      item.style.display = "flex";
    });
    return;
  }
  listItems.forEach((item) => {
    if (item.classList.contains("noIteam")) return;

    const itemValue = item.textContent.trim().toLowerCase();

    if (itemValue.includes(filterValue)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const deletIteam = (e) => {
  if (iteams.length === 0) return;
  if (e.target.classList.contains("fa-xmark")) {
    const item = e.target.closest("li");

    const itemId = item.dataset.id;
    const index = iteams.findIndex((iteam) => iteam.id === itemId);

    if (index !== -1) {
      iteams.splice(index, 1);
    }
    item.remove();
    console.log(iteams);
  }
  localStorage.setItem("iteams", JSON.stringify(iteams));

  showFeedBack();
};

const clearAll = () => {
  iteams.length = 0;
  itemList.innerHTML = ``;
  console.log(iteams);
  localStorage.setItem("iteams", JSON.stringify(iteams));

  showFeedBack();
};

const creatIteam = (value) => {
  const isDuplicate = iteams.some(
    (item) => item.value.toLowerCase() === value.toLowerCase()
  );
  if (isDuplicate) {
    alert("Item already exists!");
    return;
  }
  const listItaem = document.createElement("li");
  const itemId = `item-${crypto.randomUUID()}`;
  listItaem.dataset.id = itemId;

  listItaem.textContent = value;

  creatDeletIteamBtn(listItaem);

  itemList.appendChild(listItaem);
  const item = { id: itemId, value: value };
  iteams.push(item);
  localStorage.setItem("iteams", JSON.stringify(iteams));
  showFeedBack();
  initializePage();
};

const initializePage = () => {
  itemList.innerHTML = "";
  iteams.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.dataset.id = item.id;
    cretSpan(listItem, item.value);
    creatDeletIteamBtn(listItem);
    itemList.appendChild(listItem);
  });
  showFeedBack();
};
const creatDeletIteamBtn = (iteam) => {
  const deletBtn = document.createElement("button");
  deletBtn.classList.add("remove-item", "btn-link", "text-red");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark");
  deletBtn.appendChild(icon);
  iteam.appendChild(deletBtn);
};

const cretSpan = (parent, value) => {
  const textSpan = document.createElement("span");
  textSpan.textContent = value;
  parent.appendChild(textSpan);
};
subBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addIteamToList();
});

itemList.addEventListener("click", deletIteam);
ClearBtn.addEventListener("click", clearAll);
filter.addEventListener("input", filterResult);
itemList.addEventListener("click", editIteam);
initializePage();
