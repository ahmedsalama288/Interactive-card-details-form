// -----------------------------------------------------------------------
// [1] Add Event listener to The Submit button
// [2] when the user click on the submit btn get
//    the values of the input Fields

// [3] Check ON the Values Of the Input Fields
// [4] if The Value Is Valid change the card-data

// [5] else add The redBorder Class To The Input Field
// and display the Error Massage To it.

// [6] if the values is right change the card-data and Display Thank div
// -----------------------------------------------------------------------
let getValues = function () {
  let idList = ["name", "card-number", "month", "year", "cvc"];
  let values = idList.map((id) => {
    return document.getElementById(id).value;
  });
  let elements = idList.map((id) => {
    return document.getElementById(id);
  });
  return [values, elements];
};

let errorMassage = function (errorId, el, option) {
  let errorSpan = function (errorId, option) {
    if (errorId === "") return;
    let span = document.getElementById(errorId);
    if (option === "add") span.style.display = "inline-block";
    else if (option === "remove") span.style.display = "none";
  };
  let redBorder = function (el, option) {
    option === "add"
      ? el.classList.add("red-border")
      : el.classList.remove("red-border");
  };
  errorSpan(errorId, option);
  redBorder(el, option);
};

let checkOnCardNum = function (value) {
  let cardNum = document.getElementById("card-number");
  let match = value.match(/\d{4} \d{4} \d{4} \d{4}/g);
  if (value.length > 19 || match === null) {
    errorMassage("card-format", cardNum, "add");
  } else {
    errorMassage("card-format", cardNum, "remove");
  }
};

let checkOnInvalidInput = function () {
  let idList = ["name", "card-number", "month", "year", "cvc"];
  let check = false;
  idList.forEach((id) => {
    el = document.getElementById(id);
    if (el.classList.contains("red-border")) {
      check = true;
      return;
    }
  });
  return check;
};

let changeCard = function (valuesArr) {
  let [name, cardNumber, month, year, cvc] = [...valuesArr];
  let date = `${month === "" ? "00" : month}/${year === "" ? "00" : year}`;

  let valArr = [cardNumber, name, date, cvc];
  let cardIdArr = ["number", "cardname", "date", "cardcvc"];
  cardIdArr.forEach(function (id, i) {
    let el = document.getElementById(id);
    if (valArr[i] !== "" && valArr[i] !== "/") {
      el.innerHTML = valArr[i];
    }
  });
};

// Check ON the Values Of the Input feilds
let checkOnValues = function () {
  // let [name, cardNumber, month, year, cvc] = [...valuesArr];
  let errorId = ["", "card-format", "card-date", "card-date", "card-cvc"];

  let [valuesArr, elements] = getValues();
  valuesArr.forEach((value, i) => {
    if (value === "") {
      errorMassage(errorId[i], elements[i], "add");
    } else {
      if (errorId[i] === "card-format") {
        checkOnCardNum(value);
        return;
      }
      errorMassage(errorId[i], elements[i], "remove");
    }
  });

  changeCard(valuesArr);
};

// Thank div
let displayThank = function () {
  if (checkOnInvalidInput()) return;
  let form = document.getElementsByTagName("form")[0];
  form.style.display = "none";

  let thank = document.getElementsByClassName("thank")[0];
  thank.style.display = "flex";
};

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function (el) {
  el.preventDefault();
  checkOnValues();
  displayThank();
});
