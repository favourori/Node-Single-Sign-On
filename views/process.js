//handle signup

let axios = require("axios");

signup = () => {
  let form = document
    .getElementById("signup-form")
    .addEventListener("click", function(event) {
      event.preventDefault();
    });

  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("firstname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log(firstname, lastname, email, password);

  if (firstname && lastname && email && password) {
    axios
      .post("https://abitsso.herokuapp.com//sso/api/user/register", {
        firstName: firstname,
        lastName: lastName,
        email: email,
        password: password
      })
      .then(function(response) {
        console.log(response);
        M.toast({ html: "Account created...", classes: "teal" });
      })
      .catch(function(error) {
        console.log(error);
        M.toast({ html: "Could not create account..", classes: "red" });
      });
  }
};
