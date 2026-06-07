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