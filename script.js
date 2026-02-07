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

// function to update the total stats of income, expense and balance after load, add and delete
export const updateStatsSummery = () => {
  let incomeOnCard = document.querySelector("#incomeState");
  let expenseOnCard = document.querySelector("#expenseState");
  let BalanceOnCard = document.querySelector("#balanceState");

  let transactionList = JSON.parse(localStorage.getItem("Transactions"));
  console.log(transactionList);

  let totalIncome = transactionList
    .filter((transaction) => transaction["Type"] === "Income")
    .reduce((total, transaction) => total + transaction["Amount"], 0);

  let totalExpense = transactionList
    .filter((transaction) => transaction["Type"] === "Expense")
    .reduce((total, transaction) => total + transaction["Amount"], 0);

  let balance = totalIncome - totalExpense;

  console.log(totalIncome);

  incomeOnCard.textContent = `₹ ${totalIncome}`;
  expenseOnCard.textContent = `₹ ${totalExpense}`;
  BalanceOnCard.textContent = `₹ ${balance}`;
};

// invoking the updateStateSummary to display stats on page load
updateStatsSummery();

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
