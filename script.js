const button = document.getElementById("showBtn");
const message = document.getElementById("message");

// Show or hide message
function toggleMessage() {
    if (message.style.display === "none") {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
}

button.addEventListener("click", toggleMessage);
// Fetch users from API and display them
function loadUsers(){
    

fetch("https://personal-portfolio-blog-2.onrender.com/users")
.then(response => response.json())

.then(data => {
  
  let output = "";

  data.forEach(user => {
    output += `
      <div class="card">
        <h3>Name: ${user.name}</h3>
        <p>ID: ${user.id}</p>
      </div>
    `;
  });

  document.getElementById("users").innerHTML = output;
})

.catch(error => {
    
    alert("API failed");
});

}

// Dark Mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
const text = "Aspiring Full Stack Developer";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();