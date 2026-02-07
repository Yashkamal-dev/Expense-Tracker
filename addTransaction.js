// this file is consisting of a function,
// which will store a transaction in localStorage,
// And display it in transaction list on add transaction button

// important module to render the task on adding a transaction
import { renderTransaction } from "./transactions.js";

// function for new transaction input
export const addTransaction = () => {
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

  let transactions = JSON.parse(localStorage.getItem("Transactions"));
  //   console.log(transactions);

  let obj = {
    UID: `T${Date.now()}`,
    Type: typ,
    Amount: amnt,
    Category: ctgry,
    Description: dscrpn,
    Date: dt,
  };

  console.log(obj);

  //   adding to the transaction list
  renderTransaction(obj);

  //   updating for the localStorage
  transactions.unshift(obj);
  localStorage.setItem("Transactions", JSON.stringify(transactions));
};
