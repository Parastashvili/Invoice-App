"use strict";

const dropdown = document.getElementById("dropdown");
dropdown.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  console.log(selectedOption);
});
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const invoices = document.querySelector(".invoices");
    const invoicescontainer = document.getElementById("invoices");
    const invoicesheader = document.getElementById("sectionHeader");
    const invoicedetailed = document.getElementById("invoicedetailed");
    const backbutton = document.getElementById("backbutton");
    const emptyscreen = document.getElementById("emptyscreen");

    function ukandabruneba() {
      invoicedetailed.classList.add("animate");
      setTimeout(() => {
        invoicedetailed.classList.remove("animate");
      }, 500);
      setTimeout(() => {
        invoicescontainer.style.display = "block";
        invoicesheader.style.display = "flex";
        invoicedetailed.style.display = "none";
      }, 500);
    }

    backbutton.addEventListener("click", ukandabruneba);

    function correctDateFormat(value) {
      const [year, month, day] = value.split("-");
      const dateObj = new Date(year, month - 1, day);
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = dateObj.toLocaleDateString("en-US", options);
      const parts = formattedDate.split(" ");
      const dayPart = parts[1].replace(",", "");
      return `${dayPart} ${parts[0]} ${parts[2]}`;
    }

    function countinvoices() {
      const invoicescount = document.getElementById("sectionPinvoices");
      const numberOfInvoices = invoicescontainer.childElementCount;
      invoicescount.innerHTML = numberOfInvoices + " invoices";
      if (numberOfInvoices == 0) {
        setTimeout(() => {
          emptyscreen.style.display = "flex";
        }, 500);
      }
    }

    let lastOpenedContainer;

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
      let container = document.createElement("li");
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
        lastOpenedContainer = container;
        const deleteBTN = document.getElementById("deletebutton");
        deleteBTN.addEventListener("click", function change() {
          const delscreen = document.getElementById("deletescreen");
          const deletetext = document.getElementById("confirmdeletep");
          deletetext.innerHTML = `Are you sure you want to delete invoice #${id}? This action cannot be undone.`;
          delscreen.style.display = "flex";
          const deletebutton = document.getElementById("confirmbutton");
          document.body.style.overflow = "hidden";
          deletebutton.addEventListener("click", function deleteinvoice() {
            lastOpenedContainer.remove();
            ukandabruneba();
            delscreen.style.display = "none";
            document.body.style.overflow = "auto";
            countinvoices();
          });
          const cancelbutton = document.getElementById("cancelbutton");
          cancelbutton.addEventListener("click", function cancelbtn() {
            delscreen.style.display = "none";
            document.body.style.overflow = "auto";
          });
        });
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
        const invoicedescription =
          document.getElementById("invoicedescription");
        invoicedescription.innerHTML = description;
        const invoiceclientEmail =
          document.getElementById("invoiceclientEmail");
        invoiceclientEmail.innerHTML = clientEmail;
        const invoicesenderStreet = document.getElementById(
          "invoicesenderStreet"
        );
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
        const invoiceclientStreet = document.getElementById(
          "invoiceclientStreet"
        );
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
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
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
      bottomleft1.textContent = "Due " + correctDateFormat(paymentDue);
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

    countinvoices();
  });

const additembox = document.getElementById("additembox");
additembox.addEventListener("click", function addListItem() {
  const itemList = document.getElementById("itemlistbox");
  const newItem = document.createElement("li");
  newItem.className = "itemlistinner";
  newItem.id = "itemlistinner";
  const existingItem = document.getElementById("itemlistinner");
  newItem.innerHTML = existingItem.innerHTML;
  itemList.appendChild(newItem);
  const deleteIcons = document.querySelectorAll(".deleteicon");
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", function () {
      const itemlistinner = this.parentNode.parentNode;
      const itemList = document.getElementById("itemlistbox");
      if (itemList.childElementCount > 2) {
        itemlistinner.remove();
      }
    });
  });
});

const newpage = document.getElementById("new_invoice");
const main = document.getElementById("mainsection");
function addnewinvoice() {
  newpage.style.display = "block";
  main.style.display = "none";
}
function discard() {
  newpage.style.display = "none";
  main.style.display = "block";
  window.scrollTo({
    top: 0,
    left: 0,
  });
}
const newinvoices = document.getElementById("addNew");
newinvoices.addEventListener("click", addnewinvoice);
const discardbtn = document.getElementById("discardbutton");
discardbtn.addEventListener("click", discard);
const newbackbutton = document.getElementById("newbackbutton");
newbackbutton.addEventListener("click", discard);
