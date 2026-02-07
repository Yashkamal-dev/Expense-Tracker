import { renderTransaction } from "./transactions.js";
import { addTransaction } from "./addTransaction.js";

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

// function to display past transaction on page load
const pageLoad = () => {
  let transactionArr = JSON.parse(localStorage.getItem("Transactions"));
  transactionArr.reverse();

  transactionArr.forEach((Transaction) => {
    renderTransaction(Transaction);
  });
};

// invoking the function to render past transction
pageLoad();

// on add transaction button click event listener
addBtn.addEventListener("click", addTransaction);

// on enter event listener to add transaction
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTransaction();
  }
});
