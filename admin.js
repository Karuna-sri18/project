function showUsers(){

let e = localStorage.getItem("email");
let p = localStorage.getItem("pass");
let ph = localStorage.getItem("phone");

let text = "";

text += "Email: " + e + "<br>";
text += "Pass: " + p + "<br>";
text += "Phone: " + ph + "<br>";

document.getElementById("data").innerHTML = text;

}



function unlock(){

localStorage.setItem("lock","no");

alert("Account unlocked");

}



function clearHistory(){

localStorage.setItem("history","");

alert("History cleared");

}



function deleteUsers(){

localStorage.removeItem("email");
localStorage.removeItem("pass");
localStorage.removeItem("phone");

alert("All users deleted");

}
