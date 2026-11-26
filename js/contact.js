const nameError = document.getElementById("name-error");
const nameInput = document.getElementById("nameInput");
const emailError = document.getElementById("email-error");
const emailInput = document.getElementById("emailInput");
const phoneError = document.getElementById("phone-error");
const phoneInput = document.getElementById("phoneInput");
const queryError = document.getElementById("query-error");
const querySelect = document.getElementById("queryTypeSelect");
const messageError = document.getElementById("message-error");
const messageInput = document.getElementById("messageInput");
const form = document.getElementById("form");
const successAlert = document.getElementById("success-alert");
const faqAccordion = document.getElementById("faq-accordion");
const faqsInput = document.getElementById("faqSearchInput");
const submitModal = document.getElementById("submit-confirmation-modal");
const myModal = new bootstrap.Modal(submitModal);
const submitModalBody = document.getElementById("submit-modal-body");
const modalConfirmBtn = document.getElementById("modal-confirm-btn");
const subjectInput = document.getElementById("subjectInput");
const subjectError = document.getElementById("subject-error");
const subjectField = document.getElementById("subject-form-field");
const bookingRefInput = document.getElementById("bookingRefInput");
const bookingRefError = document.getElementById("bookingRef-error");
const bookingRefField = document.getElementById("bookingRef-form-field");


// FAQs
const faqs = [
  {
    question: "What do I need to rent a car?",
    answer: "A valid driver's licence, a credit or debit card in the driver's name, and photo ID (passport or national ID)."
  },
  {
    question: "What is the minimum age to rent?",
    answer: "Usually 21 to 25, depending on the vehicle category. Drivers under 25 may pay a young driver surcharge."
  },
  {
    question: "Can I book for someone else?",
    answer: "Yes, but the main driver must be present at pick-up with their own licence and payment card."
  },
  {
    question: "Can I add an additional driver?",
    answer: "Yes. Additional drivers must be present at pick-up with a valid licence, and a daily fee may apply."
  },
  {
    question: "Do I need an international driving permit?",
    answer: "Only if your licence isn't in English or the Roman alphabet, or if local rules require it. Check before you travel."
  },

  // Payments & Pricing
  {
    question: "What payment methods do you accept?",
    answer: "Major credit and debit cards. Cash is not accepted for the deposit."
  },
  {
    question: "What is the security deposit and when do I get it back?",
    answer: "A hold is placed on your card at pick-up. It's released within a few working days of returning the car in the agreed condition."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No. The total price shown at booking includes all mandatory charges. Optional extras like GPS, child seats, or additional drivers are listed separately."
  },
  {
    question: "Do you charge for fuel?",
    answer: "It depends on the fuel policy. With \"full to full,\" you pick up with a full tank and return it full."
  },

  // Insurance & Protection
  {
    question: "What insurance is included?",
    answer: "Basic cover (such as collision damage waiver and theft protection) is usually included, often with an excess."
  },
  {
    question: "What is the excess (deductible)?",
    answer: "The maximum amount you pay if the car is damaged or stolen. You can reduce or remove it with optional extra cover."
  },
  {
    question: "What happens if I have an accident or breakdown?",
    answer: "Contact our 24/7 helpline immediately, found on your rental agreement. Don't arrange repairs yourself without our approval."
  },

  // Pick-up & Return
  {
    question: "Where can I pick up and return the car?",
    answer: "At any of our listed branches or airport desks. Delivery and collection may be available for an extra fee."
  },
  {
    question: "Can I return the car to a different location?",
    answer: "Yes, subject to availability. A one-way fee may apply."
  },
  {
    question: "What if I'm late returning the car?",
    answer: "There's usually a short grace period. After that, extra hourly or daily charges apply, so please contact us if you're running late."
  },
  {
    question: "What if I need to return the car outside opening hours?",
    answer: "Out-of-hours return may be available at selected locations. Check your booking confirmation."
  },

  // Using the Car
  {
    question: "Is there a mileage limit?",
    answer: "Many rentals include unlimited mileage. Otherwise the daily limit and excess charge per extra km or mile are shown at booking."
  },
  {
    question: "Can I take the car abroad?",
    answer: "Cross-border travel is allowed in some cases, but you must tell us in advance and may need extra cover or documents."
  },
  {
    question: "Can I smoke in the car?",
    answer: "No. A cleaning fee applies if the car is returned smelling of smoke."
  },
  {
    question: "Are pets allowed?",
    answer: "Usually yes, if they're in a carrier or secured safely. A cleaning fee may apply for excess hair or mess."
  },
  {
    question: "Do you provide child seats?",
    answer: "Yes, available as an optional extra. Please reserve them when booking."
  },

  // Changes & Cancellations
  {
    question: "Can I change or cancel my booking?",
    answer: "Yes, through your account or by contacting us. Free cancellation is usually available up to 24 to 48 hours before pick-up."
  },
  {
    question: "What happens if I don't show up?",
    answer: "No-shows may be charged in full or in part, depending on your rate type."
  },
  {
    question: "What if the car I booked isn't available?",
    answer: "You'll be offered a similar or better vehicle in the same category."
  },

  // Fines & Other Charges
  {
    question: "Who pays for parking fines and speeding tickets?",
    answer: "You do. We'll pass your details to the authorities and may charge an admin fee."
  },
  {
    question: "How do tolls work?",
    answer: "You're responsible for tolls. Some cars have electronic toll tags, and the charges are added to your final bill."
  }
];

// utility functions


function getInputName(value) {
    switch (value) {
        case "1":
            return "New Booking Enquiry";

        case "2":
            return "Change or Cancel a Booking";

        case "3":
            return "Current Rental Support / Breakdown";

        case "4":
            return "Billing or Payment";

        case "5":
            return "Damage or Accident Report";

        case "6":
            return "Feedback or Complaint";

        case "7":
            return "Other";

        default:
            return "Choose one";
    }
}


// rendering functions

// wraps FAQ into an html element (accordion-item) 
function insertFAQintoAccordion(faq,i){
  return ` <div class="accordion-item mb-3">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse${i}"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  ${faq.question}
                </button>
              </h2>
              <div
                id="collapse${i}"
                class="accordion-collapse collapse"
                data-bs-parent="#faq-accordion"
              >
                <div class="accordion-body">
                 ${faq.answer}
                </div>
              </div>
            </div>
`
}


// adds the FAQs to the DOM 
function renderFAQs(questions){

  result = ""
  faqAccordion.innerHTML = ""

  // iterates through the list of FAQs
  for(let i = 0;i < questions.length;i++){
    faq = questions[i];
    // wrap the faq into an html element and add it to result
    result += insertFAQintoAccordion(faq,i)
  }
  faqAccordion.innerHTML = result;
}

// inserts user input data into the submission confirmation modal
function populateSubmitModal(name,email,phone,query,message,subject,bookingRef){
  result = ""
  submitModalBody.innerHTML = ""

  htmlCode = ` <ul class="submit-modal-list">
                <li>Name: ${name}</li>
                <li>Email: ${email}</li>
                <li>Phone: ${phone}</li>
                <li>Query: ${query}</li>
                 ${subject ? `<li>Subject: ${subject}</li>` : ""}
                 ${bookingRef ? `<li>Booking Ref: ${bookingRef}</li>` : ""}
                <li>Message: ${message}</li>
              </ul>`;

  submitModalBody.innerHTML = htmlCode
}





// validation helper functions

//function for email validation
function isValidEmailFormat(em) {
  var email = em.trim();

  // a@b.c, no spaces, one @
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// validate the input length
function isWithinRange(name, min, max) {
  return name.length >= min && name.length <= max;
}

// returns true if all characters of name are letters
function isOnlyLetters(name) {
  return /^[A-Za-z]+$/.test(name);
}

// phone number validation
function isValidIrishPhoneNumber(raw) {
  // 1. Only allow digits, spaces, dashes, dots, brackets and a leading +
  if (!/^\+?[\d\s().-]+$/.test(raw.trim())) return false;

  // 2. Strip formatting, convert 00353 to +353
  let num = raw.replace(/[^\d+]/g, "").replace(/^00/, "+");

  // 3. Must start with +353
  if (!num.startsWith("+353")) return false;

  // 4. Remove the country code and an optional "(0)" trunk digit
  let national = num.slice(4);
  if (national.startsWith("0")) national = national.slice(1);

  // 5. Mobile: 83, 85, 86, 87, 88, 89 + 7 digits
  const mobile = /^8[3-9]\d{7}$/;

  // 6. Landline: area code starting 1-7 or 9, 8-9 digits total
  const landline = /^[1-79]\d{7,8}$/;

  return mobile.test(national) || landline.test(national);
}

function isValidQuerySelection(query) {
  return ["1", "2", "3", "4", "5", "6", "7"].includes(query);
}


// validating email

function validateEmail(val) {
  if (!isWithinRange(val, 6, 254)) {
    emailError.innerHTML =
      "Email address must be between 6 and 254 characters long";
    return false;
  } else if (!isValidEmailFormat(val)) {
    emailError.innerHTML =
      "Email address must have the format name@example.com";
    return false;
  } else {
    emailError.innerHTML = "";
    return true;
  }
}

// validating name
function validateName(val) {
  if (!isWithinRange(val, 2, 30)) {
    nameError.innerHTML = "your name must be between 2 and 30 characters long";
    return false;
  } else if (!isOnlyLetters(val)) {
    nameError.innerHTML = "your name must only contain letters";
    return false;
  } else {
    nameError.innerHTML = "";
    return true;
  }
}

// validating phone number

function validatePhoneNumber(num) {
  var phone = num.trim();

  if (!isValidIrishPhoneNumber(phone)) {
    // display error message
    phoneError.innerHTML =
      "Please enter a valid Irish phone number, like +353 87 123 4567";
    return false;
  } else {
    // hide error message
    phoneError.innerHTML = "";
    return true;
  }
}

// validating message

function validateMessage(m) {
  if (!isWithinRange(m, 10, 2000)) {
    messageError.innerHTML =
      "the message must be between 10 and 2000 characters long";
    return false;
  } else {
    messageError.innerHTML = "";
    return true;
  }
}

// validating query type selection

function validateQuerySelect(query) {
  if (!isValidQuerySelection(query)) {
    queryError.innerHTML = "please select a Query type";
    return false;
  } else {
    queryError.innerHTML = "";
    return true;
  }
}


function validateSubject(query) {
  if (!isWithinRange(query,2,100)) {
    subjectError.innerHTML = "Subject must be between 2 and 100 characters long";
    return false;
  } else {
    subjectError.innerHTML = "";
    return true;
  }
}

function validateBookingRef(ref) {
  if (ref.length != 10) {
    bookingRefError.innerHTML = "Booking Reference must be 10 characters long";
    return false;
  } else {
    bookingRefError.innerHTML = "";
    return true;
  }
}



// displays alerts for 'timeout' seconds
function showAlert(alert, timeout) {
  alert.classList.remove("d-none");

  setTimeout(() => {
    alert.classList.add("d-none");
  }, timeout * 1000);
}

// adding event listeners

//  email validation
emailInput.addEventListener("change", function (e) {
  val = e.target.value;

  validateEmail(val);
});

// name validation
nameInput.addEventListener("change", function (e) {
  val = e.target.value;

  validateName(val);
});

// phone validation
phoneInput.addEventListener("change", function (e) {
  val = e.target.value;

  validatePhoneNumber(val);
});

// message validation
messageInput.addEventListener("change", function (e) {
  val = e.target.value;

  validateMessage(val);
});

// booking ref validation
bookingRefInput.addEventListener("change", function (e) {
  val = e.target.value;

  validateBookingRef(val);
});


// query type validation
querySelect.addEventListener("change", function (e) {
  val = e.target.value;

  // hide the 'Subject' input field
  subjectField.classList.add("d-none");
  // hide the 'Booking Ref' input field
  bookingRefField.classList.add("d-none")


  if(!validateQuerySelect(val)) return;

  
   if(val >= "1" && val <= "6" ){
    // show the Booking Ref Input field
    bookingRefField.classList.remove("d-none");
  }
  else if(val == "7"){
    // show the Subject Input field
    subjectField.classList.remove("d-none");
  }
  

});

subjectInput.addEventListener("change",function(e){
  val = e.target.value;

  validateSubject(val)
})


// closes the modal when "Confirm" button clicked
modalConfirmBtn.addEventListener("click",function(e){
  // close the modal
  myModal.hide();

  submitForm();
})

// clear all fields after submission
function resetFields() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  querySelect.value = "0";
  messageInput.value = "";
  subjectInput.value = ""
  bookingRefInput.value = ""
}


function submitForm(){
  // show submission success alert for 5 seconds
    showAlert(successAlert, 5);

    // clear all fields after submission
    resetFields();
}



// called when the 'submit' button is clicked
form.addEventListener("submit", function (e) {
  // prevent page reload
  e.preventDefault();

  // getting validation status for all input fields
  var nameValid = validateName(nameInput.value);
  var emailValid = validateEmail(emailInput.value);
  var phoneValid = validatePhoneNumber(phoneInput.value);
  var messageValid = validateMessage(messageInput.value);
  var queryValid = validateQuerySelect(querySelect.value);

  var inputName = getInputName(querySelect.value)

  // form can only be submitted if all input fields are valid
  if (nameValid && emailValid && phoneValid && messageValid && queryValid) {

    // 'Subject' input field must be valid when the 'Other' option is selected
    if(inputName == "Other" && !validateSubject(subjectInput.value)) return;

    if((querySelect.value >= "1" && querySelect.value <= "6") && !validateBookingRef(bookingRefInput.value)) return;


    // insert user input data into the confirmation modal
    populateSubmitModal(nameInput.value,emailInput.value,phoneInput.value,getInputName(querySelect.value),messageInput.value, 
                        inputName == "Other" ? subjectInput.value : null,
                        (querySelect.value >= "1" && querySelect.value <= "6") ? bookingRefInput.value : null
                      )
    // display the confirmation modal
     myModal.show();

  }
});

// when user seraches for an FAQ
faqsInput.addEventListener("input",function(e){
  search = e.target.value;
  // filter faqs that have the search term as a substring
  result = faqs.filter((faq) => faq.question.toLowerCase().includes(search.toLowerCase()));
  renderFAQs(result)
}
)


// inserts all FAQs into the DOM
renderFAQs(faqs)




