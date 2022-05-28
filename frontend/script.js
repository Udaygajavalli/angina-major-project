/* eslint-disable no-undef */
var questions = [
  "What's your name ?",
  'May we know your gender?<p style="font-size:20px;">(Male / Female)</p>',
  "What's your age?",
  'Do you suffer from hypertension or high blood pressure?<p style="font-size:20px;">(Yes / No)</p>',
  'Do you have a history of any type of cardiovascular disease?<p style="font-size:20px;">(Yes / No)</p>',
  'Are you married? <p style="font-size:20px;">(Yes / No)</p>',
  'What is the nature of your employment?<p style="font-size:20px;">(Govt_job / Never_worked / Private / Self_employed / children)</p>',
  'What is your residence type?<p style="font-size:20px;">(Urban / Rural)</p>',
  "Your avergare glucose level?",
  "Your Body Mass Index(BMI)?",
  'How often you smoke?<p style="font-size:20px;">(formerly_smoked / never_smoked / smokes)</p>',
  "Loading...",
];
var num = 0;

var inputBox = document.querySelector("#ans");
var output = document.querySelector("#result");
output.innerHTML = questions[num];
var postBody = {};
var patient_name = "";

function showResponse() {
  if (inputBox.value == "") {
  } else {
    if (num == 0) {
      patient_name = inputBox.value;
      inputBox.value = "";
      ++num;
      changeQuestion();
    } else if (num == 1) {
      postBody["gender"] = inputBox.value;

      inputBox.value = "";

      ++num;
      changeQuestion();
    } else if (num == 2) {
      postBody["age"] = inputBox.value;

      inputBox.value = "";

      ++num;
      changeQuestion();
    } else if (num == 3) {
      if (inputBox.value == "Yes") {
        postBody["hypertension"] = 1;
      } else if (inputBox.value == "No") {
        postBody["hypertension"] = 0;
      }

      inputBox.value = "";
      ++num;
      changeQuestion();
    } else if (num == 4) {
      if (inputBox.value == "Yes") {
        postBody["heart_disease"] = 1;
      } else if (inputBox.value == "No") {
        postBody["heart_disease"] = 0;
      }
      inputBox.value = "";
      ++num;
      changeQuestion();
    } else if (num == 5) {
      postBody["ever_married"] = inputBox.value;

      inputBox.value = "";
      ++num;
      changeQuestion();
    } else if (num == 6) {
      postBody["work_type"] = inputBox.value;

      inputBox.value = "";
      ++num;
      changeQuestion();
    } else if (num == 7) {
      postBody["Residence_type"] = inputBox.value;

      inputBox.value = "";
      ++num;
      changeQuestion();
    } else if (num == 8) {
      postBody["avg_glucose_level"] = inputBox.value;

      inputBox.value = "";
      ++num;
      changeQuestion();
    } else if (num == 9) {
      postBody["bmi"] = inputBox.value;

      inputBox.value = "";
      ++num;
      changeQuestion();
    } else if (num == 10) {
      postBody["smoking_status"] = inputBox.value;
      inputBox.value = "";
      ++num;
      console.log(postBody);
      changeQuestion();
    }
  }
}

async function callAPI() {
  const response = await fetch(
    "https://xmq5xza98f.execute-api.us-east-1.amazonaws.com",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    }
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}

async function changeQuestion() {
  inputBox.setAttribute("placeholder", "Enter your response");
  output.innerHTML = questions[num];
  if (num == 11) {
    inputBox.style.display = "none";
    var pred_out = await callAPI();
    output.innerHTML = `Hello, ${patient_name}! The prediction output is ${pred_out}`;
  }
}

$(document).on("keypress", function (e) {
  if (e.which == 13) {
    showResponse();
  }
});

$("#ans").focus();
