//finding all the necessary elements
const textInput = document.getElementById("text-input");
const passInput = document.getElementById("pass-input");
const signInBtn = document.getElementById("signIn-btn");

signInBtn.addEventListener("click", () => {
  if (textInput.value == "") {
    alert("invalid username");
    return;
  }
  if (passInput.value == "") {
    alert("invalid password");
    return;
  }

  if (textInput.value == "admin" && passInput.value == "admin123") {
    alert("Login successful");
  } else {
    alert("Please follow the credentials given below");
  }
});
