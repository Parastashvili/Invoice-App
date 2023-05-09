"use strict";
const dropdown = document.getElementById("dropdown");
dropdown.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
});
const draftinvoices = document.getElementById("draftinvoices");
const pendingtinvoices = document.getElementById("pendingtinvoices");
const paidinvoices = document.getElementById("paidinvoices");
const invNum = document.getElementById("sectionPinvoices");
const emptyscreen = document.getElementById("emptyscreen");
function countInvoices(num) {
  if (num == 0) {
  }
  invNum.innerHTML = num + " invoices";
  if (invoiceCount == 0) {
    setTimeout(() => {
      emptyscreen.style.display = "flex";
    }, 500);
  } else {
    emptyscreen.style.display = "none";
  }
}
paidinvoices.addEventListener("change", function () {
  const paids = document.querySelectorAll(".statustxt");
  if (this.checked) {
    for (let i = 0; i < paids.length - 1; i++) {
      if (paids[i].innerHTML == "paid") {
        invoiceCount++;
        paids[i].parentElement.parentElement.parentElement.style.display =
          "flex";
      }
    }
    countInvoices(invoiceCount);
  } else {
    for (let i = 0; i < paids.length - 1; i++) {
      if (paids[i].innerHTML == "paid") {
        invoiceCount--;
        paids[i].parentElement.parentElement.parentElement.style.display =
          "none";
      }
    }
    countInvoices(invoiceCount);
  }
});
pendingtinvoices.addEventListener("change", function () {
  const pendings = document.querySelectorAll(".statustxt");
  if (this.checked) {
    for (let i = 0; i < pendings.length - 1; i++) {
      if (pendings[i].innerHTML == "pending") {
        invoiceCount++;
        pendings[i].parentElement.parentElement.parentElement.style.display =
          "flex";
      }
    }
    countInvoices(invoiceCount);
  } else {
    for (let i = 0; i < pendings.length - 1; i++) {
      if (pendings[i].innerHTML == "pending") {
        invoiceCount--;
        pendings[i].parentElement.parentElement.parentElement.style.display =
          "none";
      }
    }
    countInvoices(invoiceCount);
  }
});
draftinvoices.addEventListener("change", function () {
  const drafts = document.querySelectorAll(".statustxt");
  if (this.checked) {
    for (let i = 0; i < drafts.length - 1; i++) {
      if (drafts[i].innerHTML == "draft") {
        invoiceCount++;
        drafts[i].parentElement.parentElement.parentElement.style.display =
          "flex";
      }
    }
    countInvoices(invoiceCount);
  } else {
    for (let i = 0; i < drafts.length - 1; i++) {
      if (drafts[i].innerHTML == "draft") {
        invoiceCount--;
        drafts[i].parentElement.parentElement.parentElement.style.display =
          "none";
      }
    }
    countInvoices(invoiceCount);
  }
});
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const invoices = document.querySelector(".invoices");
    const invoicescontainer = document.getElementById("invoices");
    const invoicesheader = document.getElementById("sectionHeader");
    const invoicedetailed = document.getElementById("invoicedetailed");
    const backbutton = document.getElementById("backbutton");
    function goBack() {
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
    backbutton.addEventListener("click", goBack);
    function correctDateFormat(value) {
      const [year, month, day] = value.split("-");
      const dateObj = new Date(year, month - 1, day);
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = dateObj.toLocaleDateString("en-US", options);
      const parts = formattedDate.split(" ");
      const dayPart = parts[1].replace(",", "");
      return `${dayPart} ${parts[0]} ${parts[2]}`;
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
      itemtotal,
      items
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
          console.log("yeasss1");
          function deleteinvoice() {
            lastOpenedContainer.remove();
            goBack();
            delscreen.style.display = "none";
            document.body.style.overflow = "auto";
            console.log("zigzas");
            deleteBTN.removeEventListener("click", change);
            deletebutton.removeEventListener("click", deleteinvoice);
            invoiceCount--;
            countInvoices(invoiceCount);
          }
          deletebutton.addEventListener("click", deleteinvoice);
          const cancelbutton = document.getElementById("cancelbutton");
          cancelbutton.addEventListener("click", function cancelbtn() {
            delscreen.style.display = "none";
            document.body.style.overflow = "auto";
            deletebutton.removeEventListener("click", deleteinvoice);
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
        const editButton = document.getElementById("editbutton");
        editButton.addEventListener("click", function editBTN() {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          invoicescontainer.style.display = "block";
          invoicesheader.style.display = "flex";
          invoicedetailed.style.display = "none";
          addnewinvoice();
          ivnoiceid.innerHTML = `Edit #${id}`;
          streetaddress.value = senderStreet;
          city.value = senderCity;
          postcode.value = senderPostCode;
          country.value = senderCountry;
          clientname.value = clientName;
          clientemail.value = clientEmail;
          streetaddress2.value = clientStreet;
          city2.value = clientCity;
          postcode2.value = clientPostCode;
          country2.value = clientCountry;
          invoicdate.value = createdAt;
          projectdescription.value = description;
          payment.value = paymentTerms;
          while (itemList.childElementCount > 2) {
            itemList.lastElementChild.remove();
          }
          for (let i = 0; i < itemNames.length - 1; i++) {
            addListItem();
          }
          const namebox = document.querySelectorAll(".inputitemname");
          const qtybox = document.querySelectorAll(".inputfieldqty");
          const pricebox = document.querySelectorAll(".inputfieldprice");
          const totalbox = document.querySelectorAll(".counttotalprice");
          for (let z = 0; z < itemNames.length; z++) {
            namebox[z].value = itemNames[z];
            qtybox[z].value = itemqty[z];
            pricebox[z].value = itemprice[z].toFixed(2);
            totalbox[z].innerHTML = itemtotal[z].toFixed(2);
          }
          const buttons1 = document.getElementById("style1");
          const buttons2 = document.getElementById("style2");
          buttons1.style.display = "none";
          buttons2.style.display = "flex";
        });
        element.removeEventListener("click", change);
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
        itemtotal,
        items
      );
      invoices.append(invoiceBox);
    }
  });
const ivnoiceid = document.getElementById("newinvoiceH");
const streetaddress = document.getElementById("streetaddress");
const city = document.getElementById("city");
const postcode = document.getElementById("postcode");
const country = document.getElementById("country");
const clientname = document.getElementById("clientname");
const clientemail = document.getElementById("clientemail");
const streetaddress2 = document.getElementById("streetaddress2");
const city2 = document.getElementById("city2");
const postcode2 = document.getElementById("postcode2");
const country2 = document.getElementById("country2");
const invoicdate = document.getElementById("invoicdate");
const projectdescription = document.getElementById("projectdescription");
const payment = document.getElementById("dropdown");
const itemList = document.getElementById("itemlistbox");
const inputitemname = document.querySelectorAll(".inputitemname");
const inputfieldqty = document.querySelectorAll(".inputfieldqty");
const inputfieldprice = document.querySelectorAll(".inputfieldprice");
const counttotalprice = document.querySelectorAll(".counttotalprice");
const saveandsend = document.getElementById("savesend");
const update = document.getElementById("update");
update.addEventListener("click", saveInvoice);
function saveInvoice() {
  let result = "";
  function generateRandomInvoiceID() {
    const invoicenums = document.querySelectorAll(".invoiceNum");
    let firstinvoice = invoicenums[0].innerHTML;
    function randomizer() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < 2; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      for (let i = 0; i < 4; i++) {
        result += Math.floor(Math.random() * 10);
      }
    }
    randomizer();
    while (firstinvoice == result) {
      randomizer();
    }
  }
  function addDaysToDate(correctDate) {
    let date = new Date(correctDate);
    date.setDate(date.getDate() + Number(payment.value));
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let result = `${year}-${month}-${day}`;
    return result;
  }
  let correctDate = invoicdate.value;
  correctDate = addDaysToDate(correctDate);
  generateRandomInvoiceID();
  function items() {
    const itemname = document.querySelectorAll(".inputitemname");
    const itemqty = document.querySelectorAll(".inputfieldqty");
    const itemprice = document.querySelectorAll(".inputfieldprice");
    let itemsArr = [];
    const itemscount = document.querySelectorAll(".itemlistinner");
    for (let index = 0; index < itemscount.length; index++) {
      let item = {
        name: itemname[index].value,
        quantity: itemqty[index].value,
        price: itemprice[index].value,
        total: (itemprice[index].value * itemqty[index].value)
          .toFixed(2)
          .toString(),
      };
      itemsArr.push(item);
    }
    return itemsArr;
  }
  function sumTotal() {
    const itemqty = document.querySelectorAll(".inputfieldqty");
    const itemprice = document.querySelectorAll(".inputfieldprice");
    let itemsArr = [];
    let sumT = 0;
    const itemscount = document.querySelectorAll(".itemlistinner");
    for (let index = 0; index < itemscount.length; index++) {
      let item = {
        total: (itemprice[index].value * itemqty[index].value).toFixed(2),
      };
      itemsArr.push(item);
    }
    for (let index = 0; index < itemscount.length; index++) {
      sumT += parseInt(itemsArr[index].total);
    }
    return sumT.toFixed(2).toString();
  }

  const newInvoice = [
    {
      id: result,
      createdAt: invoicdate.value,
      paymentDue: correctDate,
      description: projectdescription.value,
      paymentTerms: payment.value,
      clientName: clientname.value,
      clientEmail: clientemail.value,
      status: "pending",
      senderAddress: {
        street: streetaddress.value,
        city: city.value,
        postCode: postcode.value,
        country: country.value,
      },
      clientAddress: {
        street: streetaddress2.value,
        city: city2.value,
        postCode: postcode2.value,
        country: country2.value,
      },
      items: items(),
      total: sumTotal(),
    },
  ];
  console.log(newInvoice);
}
const additembox = document.getElementById("additembox");
additembox.addEventListener("click", addListItem);
function addListItem() {
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
  const lasttotalprice = document.querySelectorAll(".counttotalprice");
  lasttotalprice[lasttotalprice.length - 1].innerHTML = "00.00";
}
const newpage = document.getElementById("new_invoice");
newpage.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(newpage);
  const obj = Object.fromEntries(fd);
});
const main = document.getElementById("mainsection");
function addnewinvoice() {
  const ivnoiceid = document.getElementById("newinvoiceH");
  ivnoiceid.innerHTML = "New Invoice";
  const buttons1 = document.getElementById("style1");
  const buttons2 = document.getElementById("style2");
  buttons1.style.display = "flex";
  buttons2.style.display = "none";
  newpage.style.display = "block";
  main.style.display = "none";
  newpage.classList.add("sweep-to-right");
  setTimeout(() => {
    newpage.classList.remove("sweep-to-right");
  }, 500);
}
function discard() {
  const streetaddress = document.getElementById("streetaddress");
  streetaddress.value = "";
  const city = document.getElementById("city");
  city.value = "";
  const postcode = document.getElementById("postcode");
  postcode.value = "";
  const country = document.getElementById("country");
  country.value = "";
  const clientname = document.getElementById("clientname");
  clientname.value = "";
  const clientemail = document.getElementById("clientemail");
  clientemail.value = "";
  const streetaddress2 = document.getElementById("streetaddress2");
  streetaddress2.value = "";
  const city2 = document.getElementById("city2");
  city2.value = "";
  const postcode2 = document.getElementById("postcode2");
  postcode2.value = "";
  const country2 = document.getElementById("country2");
  country2.value = "";
  const invoicdate = document.getElementById("invoicdate");
  invoicdate.value = "";
  const projectdescription = document.getElementById("projectdescription");
  projectdescription.value = "";
  const payment = document.getElementById("dropdown");
  payment.value = 1;
  const inputitemname = document.querySelectorAll(".inputitemname");
  const inputfieldqty = document.querySelectorAll(".inputfieldqty");
  const inputfieldprice = document.querySelectorAll(".inputfieldprice");
  const counttotalprice = document.querySelectorAll(".counttotalprice");
  inputitemname[0].value = "";
  inputfieldqty[0].value = "";
  inputfieldprice[0].value = "";
  counttotalprice[0].innerHTML = "00.00";
  newpage.classList.add("sweep-to-left");
  setTimeout(() => {
    newpage.style.display = "none";
    main.style.display = "block";
    newpage.classList.remove("sweep-to-left");
  }, 500);
  const itemList = document.getElementById("itemlistbox");
  while (itemList.childElementCount > 2) {
    itemList.lastElementChild.remove();
  }
}
const newinvoices = document.getElementById("addNew");
newinvoices.addEventListener("click", addnewinvoice);
const discardbtn = document.getElementById("discardbutton");
discardbtn.addEventListener("click", discard);
const discardbtn1 = document.getElementById("discardbutton1");
discardbtn1.addEventListener("click", discard);
const newbackbutton = document.getElementById("newbackbutton");
newbackbutton.addEventListener("click", discard);
let invoiceCount = 0;
async function createAndCountInvoices() {
  let response = await fetch("./data.json");
  let data = await response.json();
  invoiceCount = document.getElementById("invoices").childElementCount;
  console.log(invoiceCount);
}
createAndCountInvoices();
