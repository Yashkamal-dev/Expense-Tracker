// this file consists of a function for rendering transaction,
// which will br used on load and on add transactrion button.
// and corresponding function to delete the transaction from ui and localstorage

// important module to update the total stats of income, expense and balance after deleting a transaction
import { updateStatsSummery } from "./script.js";

const ul = document.querySelector("#lists");

// function to render transaction
export const renderTransaction = (obj) => {
  let li = document.createElement("li");
  li.className = "transaction";
  li.classList.add(obj["UID"]);

  let type = document.createElement("span");
  type.className = "type";
  if (obj["Type"] === "Expense") {
    type.classList.add("expense");
  } else if (obj["Type"] === "Income") {
    type.classList.add("income");
  }
  type.textContent = obj["Type"];

  let name = document.createElement("h4");
  name.className = "name";
  name.textContent = obj["Category"];

  let amount = document.createElement("strong");
  amount.className = "amount";
  if (obj["Type"] === "Expense") {
    amount.classList.add("expense");
    amount.textContent = `- ₹ ${obj["Amount"]}`;
  } else if (obj["Type"] === "Income") {
    amount.classList.add("income");
    amount.textContent = `₹ ${obj["Amount"]}`;
  }

  let dateDisCon = document.createElement("div");
  dateDisCon.className = "date-dis-container";

  let date = document.createElement("time");
  date.className = "date";
  date.dateTime = obj["Date"];
  date.textContent = obj["Date"];

  let icon = document.createElement("i");
  icon.className = "separator";
  icon.textContent = "•";

  let description = document.createElement("small");
  description.className = "description";
  description.textContent = obj["Description"];

  dateDisCon.append(date, icon, description);

  let dltBtn = document.createElement("button");
  dltBtn.className = "dltBtn";
  dltBtn.id = obj["UID"];

  let dltImg = document.createElement("img");
  dltImg.className = "dltImg";
  dltImg.src = "assests/delete-icon.png";
  dltImg.alt = "delete icon";

  dltBtn.append(dltImg);
  dltBtn.addEventListener("click", () => {
    deleteTransaction(dltBtn);
  });

  li.append(type, name, amount, dateDisCon, dltBtn);

  ul.prepend(li);
};

// function to delete a transaction
const deleteTransaction = (btn) => {
  let id = btn.id;

  //   te remove from the UI
  let transactionBox = document.querySelector(`.${id}`);
  transactionBox.remove();

  //   to remove from localstorage
  let oldLocalArr = JSON.parse(localStorage.getItem("Transactions"));

  let newLocalArr = oldLocalArr.filter(
    (transaction) => transaction["UID"] !== id,
  );

  localStorage.setItem("Transactions", JSON.stringify(newLocalArr));

  // updating the stats
  updateStatsSummery();
};
