const type = document.querySelector("#type");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const description = document.querySelector("#description");

// present date in date
const date = document.querySelector("#date");
date.value = new Date().toISOString().split("T")[0];

const addBtn = document.querySelector("#addBtn");

// intiital key set
let localData = localStorage.getItem("Transactions");
if (localData === null) {
  localStorage.setItem("Transactions", JSON.stringify([]));
}

// function for new transaction input
const addTransaction = () => {
  let typ = type.value;

  let amnt = Number(amount.value);
  if (amnt == "") {
    alert("Enter the amount.");
    return false;
  } else if (isNaN(amnt)) {
    alert("Amount should only contain Numbers");
    return false;
  }

  let ctgry = category.value;
  if (ctgry === "-1") {
    alert("category is required");
    return false;
  }

  let dscrpn = description.value;
  let dt = date.value;

  console.log(dt);

  let transactions = JSON.parse(localStorage.getItem("Transactions"));
  //   console.log(transactions);

  let obj = {
    ID: `T${Date.now()}`,
    Type: typ,
    Amount: amnt,
    Category: ctgry,
    Description: dscrpn,
    Date: dt,
  };

  console.log(obj);

  //   updating for the localStorage
  transactions.unshift(obj);
  localStorage.setItem("Transactions", JSON.stringify(transactions));
};

// on click event listener
addBtn.addEventListener("click", addTransaction);

// on enter event listener
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTransaction();
  }
});
