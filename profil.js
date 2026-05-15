let selectedRole = "";

window.onload = function(){
  const loggedIn = localStorage.getItem("petikLoggedIn");

  if(loggedIn === "true"){
    showProfile();
  }else{
    showSignIn();
  }
};

function showSignIn(){
  document.getElementById("signinPage").style.display = "flex";
  document.getElementById("rolePage").style.display = "none";
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("profilePage").style.display = "none";
}

function showRolePage(){
  document.getElementById("signinPage").style.display = "none";
  document.getElementById("rolePage").style.display = "flex";
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("profilePage").style.display = "none";
}

function chooseRole(role){
  selectedRole = role;

  document.getElementById("signinPage").style.display = "none";
  document.getElementById("rolePage").style.display = "none";
  document.getElementById("signupPage").style.display = "flex";
  document.getElementById("profilePage").style.display = "none";
}

function signUp(){
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const phone = document.getElementById("signupPhone").value;
  const address = document.getElementById("signupAddress").value;

  if(name === "" || email === "" || password === "" || phone === "" || address === ""){
    alert("Lengkapi semua data terlebih dahulu");
    return;
  }

  localStorage.setItem("petikName", name);
  localStorage.setItem("petikEmail", email);
  localStorage.setItem("petikPassword", password);
  localStorage.setItem("petikPhone", phone);
  localStorage.setItem("petikAddress", address);
  localStorage.setItem("petikRole", selectedRole);
  localStorage.setItem("petikLoggedIn", "true");

  showProfile();
}

function signIn(){
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  const savedEmail = localStorage.getItem("petikEmail");
  const savedPassword = localStorage.getItem("petikPassword");

  if(email === savedEmail && password === savedPassword){
    localStorage.setItem("petikLoggedIn", "true");
    showProfile();
  }else{
    alert("Email atau password salah");
  }
}

function showProfile(){
  document.getElementById("signinPage").style.display = "none";
  document.getElementById("rolePage").style.display = "none";
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("profilePage").style.display = "block";

  const name = localStorage.getItem("petikName") || "Name";
  const email = localStorage.getItem("petikEmail") || "user@email.com";
  const phone = localStorage.getItem("petikPhone") || "-";
  const address = localStorage.getItem("petikAddress") || "Address";
  const role = localStorage.getItem("petikRole") || "Buyer";

  document.getElementById("profileName").innerText = name;
  document.getElementById("profileAddress").innerText = address;

  document.getElementById("dataName").innerText = name;
  document.getElementById("dataEmail").innerText = email;
  document.getElementById("dataPhone").innerText = phone;
  document.getElementById("dataAddress").innerText = address;
  document.getElementById("dataRole").innerText = role;
}

function logout(){
  localStorage.setItem("petikLoggedIn", "false");
  window.location.href = "index.html";
}