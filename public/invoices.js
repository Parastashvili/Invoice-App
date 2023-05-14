"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDH_ifcXcFMQDDyBr6LVEsvW7MrtgnDJu8",
  authDomain: "invoice-app-3dbc8.firebaseapp.com",
  databaseURL:
    "https://invoice-app-3dbc8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "invoice-app-3dbc8",
  storageBucket: "invoice-app-3dbc8.appspot.com",
  messagingSenderId: "580121821695",
  appId: "1:580121821695:web:f153eedc590c616b5e67ca",
  measurementId: "G-V3NV40PKS6",
};
let invoiceCount = 0;
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const firebaseRef = ref(database);
let newInvoiceNum = 0;
let editInvoice = 0;
let editInvoiceId = "";
let editInvoiceStatus = "";
onValue(firebaseRef, (snapshot) => {
  const data = snapshot.val();
  const length = Object.keys(data).length;
  let lastId = null;
  for (const key of Object.keys(data)) {
    if (!lastId || 1000 > lastId) {
      lastId = key;
    }
  }
  newInvoiceNum = Number(lastId) + 1;
  invoiceCount = length;
  countInvoices(invoiceCount);
  const invoices = document.querySelector(".invoices");
  const invoicescontainer = document.getElementById("invoices");
  const invoicesheader = document.getElementById("sectionHeader");
  const invoicedetailed = document.getElementById("invoicedetailed");
  const backbutton = document.getElementById("backbutton");
  invoicescontainer.innerHTML = "";
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
    function resetDataBase() {
      const newData = [
        {
          id: "RT3080",
          createdAt: "2021-08-18",
          paymentDue: "2021-08-19",
          description: "Re-branding",
          paymentTerms: 1,
          clientName: "Jensen Huang",
          clientEmail: "jensenh@mail.com",
          status: "paid",
          senderAddress: {
            street: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom",
          },
          clientAddress: {
            street: "106 Kendell Street",
            city: "Sharrington",
            postCode: "NR24 5WQ",
            country: "United Kingdom",
          },
          items: [
            {
              name: "Brand Guidelines",
              quantity: 1,
              price: 1800.9,
              total: 1800.9,
            },
          ],
          total: 1800.9,
        },
        {
          id: "XM9141",
          createdAt: "2021-08-21",
          paymentDue: "2021-09-20",
          description: "Graphic Design",
          paymentTerms: 30,
          clientName: "Alex Grim",
          clientEmail: "alexgrim@mail.com",
          status: "pending",
          senderAddress: {
            street: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom",
          },
          clientAddress: {
            street: "84 Church Way",
            city: "Bradford",
            postCode: "BD1 9PB",
            country: "United Kingdom",
          },
          items: [
            {
              name: "Banner Design",
              quantity: 1,
              price: 156.0,
              total: 156.0,
            },
            {
              name: "Email Design",
              quantity: 2,
              price: 200.0,
              total: 400.0,
            },
          ],
          total: 556.0,
        },
        {
          id: "RG0314",
          createdAt: "2021-09-24",
          paymentDue: "2021-10-01",
          description: "Website Redesign",
          paymentTerms: 7,
          clientName: "John Morrison",
          clientEmail: "jm@myco.com",
          status: "paid",
          senderAddress: {
            street: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom",
          },
          clientAddress: {
            street: "79 Dover Road",
            city: "Westhall",
            postCode: "IP19 3PF",
            country: "United Kingdom",
          },
          items: [
            {
              name: "Website Redesign",
              quantity: 1,
              price: 14002.33,
              total: 14002.33,
            },
          ],
          total: 14002.33,
        },
        {
          id: "RT2080",
          createdAt: "2021-10-11",
          paymentDue: "2021-10-12",
          description: "Logo Concept",
          paymentTerms: 1,
          clientName: "Alysa Werner",
          clientEmail: "alysa@email.co.uk",
          status: "pending",
          senderAddress: {
            street: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom",
          },
          clientAddress: {
            street: "63 Warwick Road",
            city: "Carlisle",
            postCode: "CA20 2TG",
            country: "United Kingdom",
          },
          items: [
            {
              name: "Logo Sketches",
              quantity: 1,
              price: 102.04,
              total: 102.04,
            },
          ],
          total: 102.04,
        },
        {
          id: "AA1449",
          createdAt: "2021-10-7",
          paymentDue: "2021-10-14",
          description: "Re-branding",
          paymentTerms: 7,
          clientName: "Mellisa Clarke",
          clientEmail: "mellisa.clarke@example.com",
          status: "pending",
          senderAddress: {
            street: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom",
          },
          clientAddress: {
            street: "46 Abbey Row",
            city: "Cambridge",
            postCode: "CB5 6EG",
            country: "United Kingdom",
          },
          items: [
            {
              name: "New Logo",
              quantity: 1,
              price: 1532.33,
              total: 1532.33,
            },
            {
              name: "Brand Guidelines",
              quantity: 1,
              price: 2500.0,
              total: 2500.0,
            },
          ],
          total: 4032.33,
        },
        {
          id: "TY9141",
          createdAt: "2021-10-01",
          paymentDue: "2021-10-31",
          description: "Landing Page Design",
          paymentTerms: 30,
          clientName: "Thomas Wayne",
          clientEmail: "thomas@dc.com",
          status: "pending",
          senderAddress: {
            street: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom",
          },
          clientAddress: {
            street: "3964  Queens Lane",
            city: "Gotham",
            postCode: "60457",
            country: "United States of America",
          },
          items: [
            {
              name: "Web Design",
              quantity: 1,
              price: 6155.91,
              total: 6155.91,
            },
          ],
          total: 6155.91,
        },
        {
          id: "FV2353",
          createdAt: "2021-11-05",
          paymentDue: "2021-11-12",
          description: "Logo Re-design",
          paymentTerms: 7,
          clientName: "Anita Wainwright",
          clientEmail: "",
          status: "draft",
          senderAddress: {
            street: "19 Union Terrace",
            city: "London",
            postCode: "E1 3EZ",
            country: "United Kingdom",
          },
          clientAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
          },
          items: [
            {
              name: "Logo Re-design",
              quantity: 1,
              price: 3102.04,
              total: 3102.04,
            },
          ],
          total: 3102.04,
        },
      ];
      const resetScreen = document.getElementById("resetScreen");
      const resetNO = document.getElementById("resetNO");
      const resetYES = document.getElementById("resetYES");
      resetNO.addEventListener("click", () => {
        resetScreen.classList.remove("resetScreenAnim");
        resetScreen.classList.add("resetScreenAnimU");
        main.style.opacity = "1";
        document.body.style.overflow = "auto";
      });
      resetScreen.classList.remove("resetScreenAnimU");
      resetScreen.classList.add("resetScreenAnim");
      main.style.opacity = "0.2";
      document.body.style.overflow = "hidden";
      resetScreen.style.display = "flex";
      function resetBase() {
        const databaseRef = ref(database);
        set(databaseRef, newData)
          .then(() => {})
          .catch((error) => {});
      }
      resetYES.addEventListener("click", () => {
        resetBase();
        location.reload();
      });
    }
    const resetPic = document.getElementById("resetPic");
    resetPic.addEventListener("click", () => {
      resetDataBase();
    });
    container.append(element);
    container.classList.add("invoiceContainer");
    element.append(top, bottom);
    element.classList.add("topbottomspace");
    element.classList.add("invoiceContainerInner");
    element.addEventListener("click", function change() {
      lastOpenedContainer = container;
      const itemIndex = function () {
        try {
          return data.findIndex((data) => data.id === id);
        } catch (error) {
          const targetId = id;
          let targetItem = null;
          for (const [key, value] of Object.entries(data)) {
            if (value.id === targetId) {
              targetItem = { [key]: value };
              break;
            }
          }
          const targetKey = Object.keys(targetItem)[0];
          return parseInt(targetKey);
        }
      };
      editInvoice = itemIndex();
      editInvoiceId = id;
      editInvoiceStatus = status;
      const deleteBTN = document.getElementById("deletebutton");
      deleteBTN.addEventListener("click", function change() {
        const delscreen = document.getElementById("deletescreen");
        const deletetext = document.getElementById("confirmdeletep");
        deletetext.innerHTML = `Are you sure you want to delete invoice #${id}? This action cannot be undone.`;
        delscreen.style.display = "flex";
        const deletebutton = document.getElementById("confirmbutton");
        document.body.style.overflow = "hidden";
        function deleteinvoice() {
          lastOpenedContainer.remove();
          goBack();
          delscreen.style.display = "none";
          document.body.style.overflow = "auto";
          deleteBTN.removeEventListener("click", change);
          deletebutton.removeEventListener("click", deleteinvoice);
          invoiceCount--;
          countInvoices(invoiceCount);
          try {
            remove(ref(database, "/" + itemIndex()));
          } catch (error) {}
          const filter1 = document.getElementById("draftinvoices");
          const filter2 = document.getElementById("pendingtinvoices");
          const filter3 = document.getElementById("paidinvoices");
          filter1.checked = true;
          filter2.checked = true;
          filter3.checked = true;
        }
        deletebutton.addEventListener("click", deleteinvoice);
        const cancelbutton = document.getElementById("cancelbutton");
        cancelbutton.addEventListener("click", function cancelbtn() {
          delscreen.style.display = "none";
          document.body.style.overflow = "auto";
          deletebutton.removeEventListener("click", deleteinvoice);
        });
        const cancelbutton1 = document.getElementById("cancelbutton1");
        cancelbutton1.addEventListener("click", function cancelbtn() {
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
      marraspaidbutton.addEventListener("click", () => {
        let newStatus = "paid";
        if (status == "draft") {
          newStatus = "pending";
          confirmdelete.innerHTML = "Save & Send";
          confTXT.innerHTML =
            "This invoice will be SEND if you will confirm, are you sure that you want to proceed ?";
        } else {
          newStatus = "paid";
          confirmdelete.innerHTML = "Mark as PAID";
          confTXT.innerHTML =
            "This invoice will be marked as PAID, are you sure that you want to proceed ?";
        }
        const confirmscreen = document.getElementById("deletescreen1");
        confirmscreen.style.display = "flex";
        document.body.style.overflow = "hidden";
        function updateInvoiceStatus(newStatus) {
          const invoiceRef = ref(database, "/" + editInvoice);
          update(invoiceRef, { status: newStatus })
            .then(() => {})
            .catch((error) => {});
        }
        const cancel = document.getElementById("cancelbutton1");
        cancel.addEventListener("click", () => {
          confirmscreen.style.display = "none";
          document.body.style.overflow = "auto";
        });
        const confirmOK = document.getElementById("confirmbuttonOK");
        confirmOK.addEventListener("click", () => {
          updateInvoiceStatus(newStatus);
          location.reload();
        });
      });
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
        marraspaidbutton.innerHTML = "Save & Send";
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
        marraspaidbutton.innerHTML = "Mark as Paid";
      }
      const invoicecreatedAt = document.getElementById("invoicecreatedAt");
      invoicecreatedAt.innerHTML = correctDateFormat(createdAt);
      const invoicedescription = document.getElementById("invoicedescription");
      invoicedescription.innerHTML = description;
      const invoiceclientEmail = document.getElementById("invoiceclientEmail");
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
        emptyscreen.style.display = "none";
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

  for (let i = 0; i < newInvoiceNum + 1; i++) {
    try {
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
      const itemIndex = data.findIndex((data) => data.id === id);
    } catch (error) {}
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
const updates = document.getElementById("update");
const savesend = document.getElementById("savesend");
const savedraft = document.getElementById("savedraft");
const confTXT = document.getElementById("confirmdeletep1");
const confirmdelete = document.getElementById("confirmdelete5");
savesend.addEventListener("click", function () {
  saveInvoice("pending");
  confirmdelete.innerHTML = "Confirm Invoice";
  confTXT.innerHTML =
    "This invoice will be created after confirmation, are you sure that you want to create it ?";
});
savedraft.addEventListener("click", function () {
  saveInvoice("draft");
  confirmdelete.innerHTML = "Confirm Invoice";
  confTXT.innerHTML =
    "This invoice will be saved as draft in your invoices after confirmation, are you sure that you want to save it ?";
});
updates.addEventListener("click", updateInvoice);
function updateInvoice() {
  const confirmscreen = document.getElementById("deletescreen1");
  confirmscreen.style.display = "flex";

  document.body.style.overflow = "hidden";
  const cancel = document.getElementById("cancelbutton1");
  cancel.addEventListener("click", () => {
    confirmscreen.style.display = "none";

    document.body.style.overflow = "auto";
  });
  confirmdelete.innerHTML = "Confirm Invoice Update";
  confTXT.innerHTML =
    "This invoice will be updated after confirmation, are you sure that you want to update it ?";
  const confirmOK = document.getElementById("confirmbuttonOK");
  confirmOK.addEventListener("click", () => {
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
    function items() {
      const itemname = document.querySelectorAll(".inputitemname");
      const itemqty = document.querySelectorAll(".inputfieldqty");
      const itemprice = document.querySelectorAll(".inputfieldprice");
      let itemsArr = [];
      const itemscount = document.querySelectorAll(".itemlistinner");
      for (let index = 0; index < itemscount.length; index++) {
        let item = {
          name: itemname[index].value,
          quantity: Number(itemqty[index].value),
          price: Number(itemprice[index].value),
          total: Number(
            (itemprice[index].value * itemqty[index].value).toFixed(2)
          ),
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
        id: editInvoiceId,
        createdAt: invoicdate.value,
        paymentDue: correctDate,
        description: projectdescription.value,
        paymentTerms: Number(payment.value),
        clientName: clientname.value,
        clientEmail: clientemail.value,
        status: editInvoiceStatus,
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
        total: Number(sumTotal()),
      },
    ];
    function saveInvoiceOK() {
      set(ref(database, "/" + editInvoice), {
        id: editInvoiceId,
        createdAt: invoicdate.value,
        paymentDue: correctDate,
        description: projectdescription.value,
        paymentTerms: Number(payment.value),
        clientName: clientname.value,
        clientEmail: clientemail.value,
        status: editInvoiceStatus,
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
        total: Number(sumTotal()),
      })
        .then(() => {})
        .catch((error) => {});
    }
    saveInvoiceOK();
    location.reload();
  });
}
function saveInvoice(status) {
  const confirmscreen = document.getElementById("deletescreen1");
  confirmscreen.style.display = "flex";
  document.body.style.overflow = "hidden";
  let result = "";
  const cancel = document.getElementById("cancelbutton1");
  cancel.addEventListener("click", () => {
    confirmscreen.style.display = "none";
    document.body.style.overflow = "auto";
  });
  const confirmOK = document.getElementById("confirmbuttonOK");
  confirmOK.addEventListener("click", () => {
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
          quantity: Number(itemqty[index].value),
          price: Number(itemprice[index].value),
          total: Number(
            (itemprice[index].value * itemqty[index].value).toFixed(2)
          ),
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
        paymentTerms: Number(payment.value),
        clientName: clientname.value,
        clientEmail: clientemail.value,
        status: status,
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
    function saveInvoiceOK() {
      set(ref(database, "/" + newInvoiceNum++), {
        id: result,
        createdAt: invoicdate.value,
        paymentDue: correctDate,
        description: projectdescription.value,
        paymentTerms: Number(payment.value),
        clientName: clientname.value,
        clientEmail: clientemail.value,
        status: status,
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
        total: Number(sumTotal()),
      })
        .then(() => {})
        .catch((error) => {});
    }
    saveInvoiceOK();
    location.reload();
  });
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
    }, 100);
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
    for (let i = 0; i < pendings.length; i++) {
      if (pendings[i].innerHTML == "pending") {
        invoiceCount++;
        pendings[i].parentElement.parentElement.parentElement.style.display =
          "flex";
      }
    }
    countInvoices(invoiceCount);
  } else {
    for (let i = 0; i < pendings.length; i++) {
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
    for (let i = 0; i < drafts.length; i++) {
      if (drafts[i].innerHTML == "draft") {
        invoiceCount++;
        drafts[i].parentElement.parentElement.parentElement.style.display =
          "flex";
      }
    }
    countInvoices(invoiceCount);
  } else {
    for (let i = 0; i < drafts.length; i++) {
      if (drafts[i].innerHTML == "draft") {
        invoiceCount--;
        drafts[i].parentElement.parentElement.parentElement.style.display =
          "none";
      }
    }
    countInvoices(invoiceCount);
  }
});
const checkbox = document.getElementById("toggle");
const div = document.getElementById("checkdiv");
window.addEventListener("click", (event) => {
  if (
    !(
      event.target.matches(".filterlist") ||
      event.target.matches("#toggle") ||
      event.target.matches("#checkdiv") ||
      event.target.matches("#draftinvoices") ||
      event.target.matches("#pendingtinvoices") ||
      event.target.matches("#paidinvoices")
    )
  ) {
    checkbox.checked = false;
  }
});

const dayNightIcon = document.getElementById("day_night");
dayNightIcon.addEventListener("click", function () {
  const currentMode = localStorage.getItem("dark-mode");
  if (currentMode === "off") {
    localStorage.setItem("dark-mode", "on");
    dayNightIcon.src = "./assets/icon-sun.svg";
    setDarkModeColors();
  } else {
    localStorage.setItem("dark-mode", "off");
    dayNightIcon.src = "./assets/icon-moon.svg";
    setLightModeColors();
  }
});
if (localStorage.getItem("dark-mode") === "on") {
  dayNightIcon.src = "./assets/icon-sun.svg";
  setDarkModeColors();
} else {
  dayNightIcon.src = "./assets/icon-moon.svg";
  setLightModeColors();
}
function setDarkModeColors() {
  const root = document.documentElement;
  root.style.setProperty("--wholeContentBG", "#141625");
  root.style.setProperty("--boldText", "#FFFFFF");
  root.style.setProperty("--white", "#1E2139");
  root.style.setProperty("--invoiceCount", "#DFE3FA");
  root.style.setProperty("--invoiceDate", "#DFE3FA");
  root.style.setProperty("--clientName", "#FFFFFF");
  root.style.setProperty("--draft", "#DFE3FA");
  root.style.setProperty("--draftbg", "rgb(223, 227, 250,0.06)");
  root.style.setProperty("--statustxtMain", "#DFE3FA");
  root.style.setProperty("--lighttext", "#DFE3FA");
  root.style.setProperty("--paymentBG", "#0C0E16");
  root.style.setProperty("--itemsDetailed", "#252945");
  root.style.setProperty("--TotalAmount", "#FFFFFF");
  root.style.setProperty("--editBTNBG", "#252945");
  root.style.setProperty("--inputBorder", "#252945");
  root.style.setProperty("--formfield", "#1E2139");
  root.style.setProperty("--headerBG", "#1E2139");
  root.style.setProperty("--newInvoice", "#141625");
  root.style.setProperty("--addItemBTN", "#252945");
  root.style.setProperty("--additemtxt", "#7E88C3");
  root.style.setProperty("--cancelButton", "#252945");
  root.style.setProperty("--draftbtnColor", "#DFE3FA");
  root.style.setProperty("--cancelbtnTXT", "#DFE3FA");
}
function setLightModeColors() {
  const root = document.documentElement;
  root.style.setProperty("--cancelbtnTXT", "#7e88c3");
  root.style.setProperty("--draftbtnColor", "#888eb0");
  root.style.setProperty("--cancelButton", "#f9fafe");
  root.style.setProperty("--additemtxt", "rgb(133, 139, 178)");
  root.style.setProperty("--addItemBTN", "#f9fafe");
  root.style.setProperty("--newInvoice", "#ffffff");
  root.style.setProperty("--formfield", "#ffffff");
  root.style.setProperty("--editBTNBG", "#f9fafe");
  root.style.setProperty("--TotalAmount", "#FFFFFF");
  root.style.setProperty("--itemsDetailed", "#f9fafe");
  root.style.setProperty("--paymentBG", "rgb(55, 59, 83)");
  root.style.setProperty("--statustxtMain", "#858bb2");
  root.style.setProperty("--clientName", "rgb(133, 139, 178)");
  root.style.setProperty("--invoiceDate", "rgb(133, 139, 178)");
  root.style.setProperty("--wholeContentBG", "rgb(248, 248, 251)");
  root.style.setProperty("--logoLightBG", "rgb(146, 119, 255)");
  root.style.setProperty("--buttonBG", "rgb(124, 93, 250)");
  root.style.setProperty("--logoBGHover", "rgb(146, 119, 255)");
  root.style.setProperty("--boldText", "rgb(12, 14, 22)");
  root.style.setProperty("--pending", "rgb(255, 143, 0)");
  root.style.setProperty("--paid", "rgb(51, 214, 159)");
  root.style.setProperty("--draft", "rgb(55, 59, 83)");
  root.style.setProperty("--paidbg", "rgb(51, 214, 159, 0.06)");
  root.style.setProperty("--pendingbg", "rgb(255, 143, 0, 0.06)");
  root.style.setProperty("--draftbg", "rgb(55, 59, 83, 0.06)");
  root.style.setProperty("--lighttext", "rgb(133, 139, 178)");
  root.style.setProperty("--invoiceCount", "rgb(133, 139, 178)");
  root.style.setProperty("--deleteBG", "rgb(236, 87, 87)");
  root.style.setProperty("--profileLeftBorder", "rgb(73, 78, 110)");
  root.style.setProperty("--headerBG", "rgb(55, 59, 83)");
  root.style.setProperty("--innerShadow", "rgba(72, 84, 159, 0.100397)");
  root.style.setProperty("--plussign", "#ffffff");
  root.style.setProperty("--white", "#ffffff");
  root.style.setProperty("--diezi", "#7e88c3");
  root.style.setProperty("--editBTN", "#f9fafe");
  root.style.setProperty("--paidBTNbg", "#7c5dfa");
  root.style.setProperty("--inputBorder", "#dfe3fa");
}

if (window.innerWidth >= 768) {
  document.querySelector(".sectionButtonTxt").innerHTML = "New Invoice";
}
window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) {
    document.querySelector(".sectionButtonTxt").innerHTML = "New Invoice";
  } else {
    document.querySelector(".sectionButtonTxt").innerHTML = "New";
  }
});
