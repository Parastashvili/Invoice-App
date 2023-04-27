import data from "./data.json" assert { type: "json" };

const invoices = document.querySelector(".invoices");
const invoicescontainer = document.getElementById("invoices");
const invoicesheader= document.getElementById("sectionHeader");

const createElement = (id, clientName, paymentDue, total, status) => {
  const container = document.createElement("li");
  const element = document.createElement("div");
  const top = document.createElement("div");
  const bottom = document.createElement("div");
  const topleft = document.createElement("div");
  const topleft1 = document.createElement("h5");
  const topleft2 = document.createElement("h5");
  const topright = document.createElement("p");
  const bottomleft = document.createElement("div");
  const bottomleft1 = document.createElement("date");
  const bottomleft2 = document.createElement("h5");
  const bottomright = document.createElement("div");
  const invoicestatus = document.createElement("div");
  const statustxt = document.createElement("h5");
  container.append(element);
  container.classList.add("invoiceContainer");
  element.append(top, bottom);
  element.classList.add("topbottomspace");
  element.classList.add("invoiceContainerInner");
  element.addEventListener("click", function change() {
    element.classList.add("backOutLeft");
    setTimeout(() => {
      element.classList.remove("backoutleft");
    }, 2000);
    setTimeout(() => {
      invoicescontainer.style.display = "none";
      invoicesheader.style.display = "none";
    }, 500);
  });
  top.append(topleft, topright);
  top.classList.add("contenttopbottom");
  const numberSign = document.createElement("span");
  numberSign.classList.add("numbersign");
  topleft1.textContent = "#";
  topleft1.classList.add("numbersign");
  topleft2.textContent = id;
  topleft2.classList.add("invoiceNum");
  topleft.append(topleft1, topleft2);
  topleft.classList.add("numbercontainer");
  topright.textContent = clientName;
  topright.classList.add("clientname");
  bottom.append(bottomleft, bottomright);
  bottom.classList.add("contenttopbottom");
  bottomleft.append(bottomleft1, bottomleft2);
  bottomleft.classList.add("bottomleftside");
  const dateObj = new Date(paymentDue);
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const day = formattedDate.slice(4, 6);
  const month = formattedDate.slice(0, 3);
  const year = formattedDate.slice(8);
  bottomleft1.textContent = "Due " + day + " " + month + " " + year;
  bottomleft1.classList.add("invoicedate");
  bottomleft2.textContent =
    "£ " +
    total.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  invoicestatus.classList.add("statuscircle");
  if (status == "paid") {
    bottomright.classList.add("invoicestatusPaid", "statusopacity");
    statustxt.classList.add("invoicestatusPaid");
    invoicestatus.classList.add("statuscirclepaid");
  } else if (status == "draft") {
    bottomright.classList.add("invoicestatusDraft", "statusopacity");
    statustxt.classList.add("invoicestatusDraft");
    invoicestatus.classList.add("statuscircledraft");
  } else if (status == "pending") {
    bottomright.classList.add("invoicestatusPending", "statusopacity");
    statustxt.classList.add("invoicestatusPending");
    invoicestatus.classList.add("statuscirclepending");
  }
  statustxt.textContent = status;
  statustxt.classList.add("statustxt");
  bottomright.append(invoicestatus, statustxt);
  return container;
};

const createElementInner = (
  id,
  description,
  street,
  city,
  postCode,
  country,
  createdAt,
  paymentDue,
  clientName,
  street2,
  city2,
  postCode2,
  country2,
  clientEmail,
  name,
  quantity,
  price,
  total,
  totalSUM
) => {
    
};

for (let i = 0; i < data.length; i++) {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = data[i];
  const itemNames = [];
  for (let j = 0; j < items.length; j++) {
    const { name, quantity, price, total } = items[j];
    itemNames.push(name);
  }
  const {
    street: senderStreet,
    city: senderCity,
    postCode: senderPostCode,
    country: senderCountry,
  } = senderAddress;
  const {
    street: clientStreet,
    city: clientCity,
    postCode: clientPostCode,
    country: clientCountry,
  } = clientAddress;
  const invoiceBox = createElement(id, clientName, paymentDue, total, status);
  invoices.append(invoiceBox);
}
