const greeting = document.getElementById("greeting");

const hour = new Date().getHours();

let greetingText = "";

if (hour < 12) {
    greetingText = "Good Morning";
}
else if (hour < 17) {
    greetingText = "Good Afternoon";
}
else {
    greetingText = "Good Evening";
}

const userName = "Piush!";

greeting.innerHTML = `
    👋 ${greetingText}, <span class="username">${userName}</span>
`;