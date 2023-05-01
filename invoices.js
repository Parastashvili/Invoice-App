"use strict";
const data = new XMLHttpRequest();
data.open("GET", "./data.json");

const invoices = document.querySelector(".invoices");
const invoicescontainer = document.getElementById("invoices");
const invoicesheader = document.getElementById("sectionHeader");
const invoicedetailed = document.getElementById("invoicedetailed");
const backbutton = document.getElementById("backbutton");

backbutton.addEventListener("click", function ukandabruneba() {
  invoicedetailed.classList.add("animate");
  setTimeout(() => {
    invoicedetailed.classList.remove("animate");
  }, 500);
  setTimeout(() => {
    invoicescontainer.style.display = "block";
    invoicesheader.style.display = "block";
    invoicedetailed.style.display = "none";
  }, 500);
});

function correctDateFormat(value) {
  const [year, month, day] = value.split("-");
  const dateObj = new Date(year, month - 1, day);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const parts = formattedDate.split(" ");
  const dayPart = parts[1].replace(",", "");
  return `${dayPart} ${parts[0]} ${parts[2]}`;
}

const createElement = (
  id,
  clientName,
  paymentDue,
  total,
  status,
  createdAt,
  description,
  paymentTerms,
  clientEmail,
  senderStreet,
  senderCity,
  senderPostCode,
  senderCountry,
  clientStreet,
  clientCity,
  clientPostCode,
  clientCountry,
  itemNames,
  itemqty,
  itemprice,
  itemtotal
) => {
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
    const invoiceid = document.getElementById("invoiceid");
    invoiceid.innerHTML = id;
    const invoiceclientName = document.getElementById("invoiceclientName");
    invoiceclientName.innerHTML = clientName;
    const invoicepaymentDue = document.getElementById("invoicepaymentDue");
    invoicepaymentDue.innerHTML = correctDateFormat(paymentDue);
    const invoicetotal = document.getElementById("invoicetotal");
    invoicetotal.innerHTML =
      "£ " +
      total.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    const invoicestatus = document.getElementById("invoicestatus");
    invoicestatus.innerHTML = status;
    const statusboxcolors = document.getElementById("statusboxcolors");
    const circlecolor = document.getElementById("circlecolor");
    const marraspaidbutton = document.getElementById("marraspaidbutton");
    if (status === "paid") {
      invoicestatus.classList.add("paidcolor");
      statusboxcolors.classList.add("paidbg");
      circlecolor.classList.add("paidcircle");
      invoicestatus.classList.remove("draftcolor");
      statusboxcolors.classList.remove("draftbg");
      circlecolor.classList.remove("draftcircle");
      invoicestatus.classList.remove("pendingcolor");
      statusboxcolors.classList.remove("pendingbg");
      circlecolor.classList.remove("pendingcircle");
      marraspaidbutton.style.display = "none";
    } else if (status === "draft") {
      invoicestatus.classList.add("draftcolor");
      statusboxcolors.classList.add("draftbg");
      circlecolor.classList.add("draftcircle");
      invoicestatus.classList.remove("paidcolor");
      statusboxcolors.classList.remove("paidbg");
      circlecolor.classList.remove("paidcircle");
      invoicestatus.classList.remove("pendingcolor");
      statusboxcolors.classList.remove("pendingbg");
      circlecolor.classList.remove("pendingcircle");
      marraspaidbutton.style.display = "block";
    } else if (status === "pending") {
      invoicestatus.classList.add("pendingcolor");
      statusboxcolors.classList.add("pendingbg");
      circlecolor.classList.add("pendingcircle");
      invoicestatus.classList.remove("paidcolor");
      statusboxcolors.classList.remove("paidbg");
      circlecolor.classList.remove("paidcircle");
      invoicestatus.classList.remove("draftcolor");
      statusboxcolors.classList.remove("draftbg");
      circlecolor.classList.remove("draftcircle");
      marraspaidbutton.style.display = "block";
    }
    const invoicecreatedAt = document.getElementById("invoicecreatedAt");
    invoicecreatedAt.innerHTML = correctDateFormat(createdAt);
    const invoicedescription = document.getElementById("invoicedescription");
    invoicedescription.innerHTML = description;
    const invoiceclientEmail = document.getElementById("invoiceclientEmail");
    invoiceclientEmail.innerHTML = clientEmail;
    const invoicesenderStreet = document.getElementById("invoicesenderStreet");
    invoicesenderStreet.innerHTML = senderStreet;
    const invoicesenderCity = document.getElementById("invoicesenderCity");
    invoicesenderCity.innerHTML = senderCity;
    const invoicesenderPostCode = document.getElementById(
      "invoicesenderPostCode"
    );
    invoicesenderPostCode.innerHTML = senderPostCode;
    const invoicesenderCountry = document.getElementById(
      "invoicesenderCountry"
    );
    invoicesenderCountry.innerHTML = senderCountry;
    const invoiceclientStreet = document.getElementById("invoiceclientStreet");
    invoiceclientStreet.innerHTML = clientStreet;
    const invoiceclientCity = document.getElementById("invoiceclientCity");
    invoiceclientCity.innerHTML = clientCity;
    const invoiceclientPostCode = document.getElementById(
      "invoiceclientPostCode"
    );
    invoiceclientPostCode.innerHTML = clientPostCode;
    const invoiceclientCountry = document.getElementById(
      "invoiceclientCountry"
    );
    invoiceclientCountry.innerHTML = clientCountry;
    const items = document.getElementById("items");
    items.innerHTML = "";
    for (let k = 0; k < itemNames.length; k++) {
      const itemsIL = document.createElement("il");
      itemsIL.classList.add("itemlist");
      const itemnameprice = document.createElement("div");
      itemnameprice.classList.add("itemnameprice");
      const itemnamepriceinner = document.createElement("div");
      itemnamepriceinner.classList.add("itemnamepriceinner");
      const quantitydiv = document.createElement("div");
      quantitydiv.classList.add("quantitydiv");
      const itemnamedetails = document.createElement("h5");
      itemnamedetails.classList.add("itemnamedetails");
      itemnamedetails.innerHTML = itemNames[k];
      const qtytotalprice = document.createElement("h5");
      qtytotalprice.classList.add("qtytotalprice");
      qtytotalprice.innerHTML =
        "£ " +
        itemtotal[k].toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      const qtyclass = document.createElement("p");
      qtyclass.classList.add("qtyclass");
      qtyclass.innerHTML = itemqty[k] + " x ";
      const qtyprice = document.createElement("p");
      qtyprice.classList.add("qtyprice");
      qtyprice.innerHTML =
        "£ " +
        itemprice[k].toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      quantitydiv.append(qtyclass, qtyprice);
      itemnamepriceinner.append(itemnamedetails, quantitydiv);
      itemnameprice.append(itemnamepriceinner, qtytotalprice);
      itemsIL.append(itemnameprice);
      items.append(itemsIL);
    }
    element.classList.add("backOutLeft");
    setTimeout(() => {
      element.classList.remove("backOutLeft");
    }, 500);
    setTimeout(() => {
      invoicescontainer.style.display = "none";
      invoicesheader.style.display = "none";
      invoicedetailed.style.display = "block";
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
  bottomleft2.classList.add("invoiceprice");
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
  const itemqty = [];
  const itemprice = [];
  const itemtotal = [];
  for (let j = 0; j < items.length; j++) {
    const { name, quantity, price, total } = items[j];
    itemNames.push(name);
    itemqty.push(quantity);
    itemprice.push(price);
    itemtotal.push(total);
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
  const invoiceBox = createElement(
    id,
    clientName,
    paymentDue,
    total,
    status,
    createdAt,
    description,
    paymentTerms,
    clientEmail,
    senderStreet,
    senderCity,
    senderPostCode,
    senderCountry,
    clientStreet,
    clientCity,
    clientPostCode,
    clientCountry,
    itemNames,
    itemqty,
    itemprice,
    itemtotal
  );
  invoices.append(invoiceBox);
}
