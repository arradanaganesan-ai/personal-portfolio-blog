const button = document.getElementById("showBtn");
const message = document.getElementById("message");

button.addEventListener("click", () => {
    if (message.style.display === "none") {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
});
function loadUsers(){

fetch("https://jsonplaceholder.typicode.com/users")

.then(response => response.json())

.then(data => {

let output = "";

data.forEach(user => {

output += `
<div class="card">
<h3>${user.name}</h3>
<p>${user.email}</p>
<p>${user.address.city}</p>
</div>
`;

});

document.getElementById("users").innerHTML = output;

})

.catch(error => console.log(error));

}

document.getElementById("contactForm").addEventListener("submit", function(event){

    event.preventDefault();

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("userMessage").value.trim();

    let valid = true;

    if(name === ""){
        document.getElementById("nameError").textContent = "Name is required";
        valid = false;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(email === ""){
        document.getElementById("emailError").textContent = "Email is required";
        valid = false;
    }
    else if(!email.match(emailPattern)){
        document.getElementById("emailError").textContent = "Enter a valid email";
        valid = false;
    }

    if(message === ""){
        document.getElementById("messageError").textContent = "Message is required";
        valid = false;
    }

    if(valid){
        alert("Form Submitted Successfully!");
    }
});