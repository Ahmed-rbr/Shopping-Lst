const form = document.querySelector(".form");
const itemList = document.getElementById("item-list");
const subBtn = document.querySelector(".btn");
const iteams = [];

const addIteamToList = () => {
  const formData = new FormData(form);
  for (let [name, value] of formData.entries()) {
    if (value.trim() === "") {
      return;
    }

    creatIteam(value);

    form.reset();
  }
};

const deletIteam = (e) => {
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
};

const creatIteam = (value) => {
  const listItaem = document.createElement("li");
  const itemId = `item-${Date.now()}`;
  listItaem.id = itemId;
  listItaem.textContent = value;
  creatDeletIteamBtn(listItaem);

  itemList.appendChild(listItaem);
  iteams.push({ id: itemId, value: value });
};

const creatDeletIteamBtn = (iteam) => {
  const deletBtn = document.createElement("button");
  deletBtn.classList.add("remove-item", "btn-link", "text-red");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark");

  deletBtn.appendChild(icon);
  iteam.appendChild(deletBtn);
};

subBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addIteamToList();
});

itemList.addEventListener("click", deletIteam);
