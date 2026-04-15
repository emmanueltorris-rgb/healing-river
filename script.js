if (typeof module !== 'undefined') {
    module.exports = { formatSmsMessage };
}

function formatSmsMessage(name, baseMessage) {
    if (!name) return `Healing River: ${baseMessage}`;
    return `Healing River: Welcome ${name}! ${baseMessage}`;
}

/* code explanation */

async function loadVerse() {
    const textTarget = document.getElementById('bible-text');
    const refTarget = document.getElementById('bible-ref');
    try {
        const response = await fetch('https://bible-api.com/john+4:14');
        const data = await response.json();
        if (textTarget && refTarget) {
            textTarget.innerText = `"${data.text.trim()}"`;
            refTarget.innerText = `— ${data.reference}`;
        }
    } catch (err) {
        console.error("API Error:", err);
    }
}

async function sendChurchSMS(phone, message) {
    const TEXIN_API_KEY = 'texin_332bc391193ce1bf04ed2f78cb157899'; 
    const SENDER_ID = 'Texin'; 
    
    let cleanMessage = message.replace(/\s+/g, " ")
                              .replace(/[^a-zA-Z0-9\s.,!?:]/g, "")
                              .trim();

    const url = `https://texin.co.ke/user/billing_gateway.php?api_key=${TEXIN_API_KEY}&sender_id=${SENDER_ID}&number=${phone}&text=${encodeURIComponent(cleanMessage)}&type=0&format=json`;

    try {
        await fetch(url, { mode: 'no-cors' }); 
        return true; 
    } catch (error) {
        return false;
    }
}

async function subscribeToVerse() {
    const phoneInput = document.getElementById('member-phone');
    const verseText = document.getElementById('bible-text')?.innerText || "";
    const verseRef = document.getElementById('bible-ref')?.innerText || "";
    
    if (!phoneInput || !phoneInput.value) {
        alert("Please enter a phone number.");
        return;
    }

    const fullMsg = `Healing River: ${verseText} - ${verseRef}`;
    const success = await sendChurchSMS(phoneInput.value.trim(), fullMsg);
    
    if (success) {
        alert("Success! Full verse sent.");
        phoneInput.value = ""; 
    }
}

async function unsubscribeFromVerse() {
    const phoneInput = document.getElementById('member-phone');
    if (!phoneInput || !phoneInput.value) {
        alert("Enter your phone number.");
        return;
    }

    const goodbyeMsg = "Healing River: You have been unsubscribed.";
    const success = await sendChurchSMS(phoneInput.value.trim(), goodbyeMsg);
    
    if (success) {
        alert("Unsubscribed.");
        phoneInput.value = "";
    }
}

document.addEventListener('DOMContentLoaded', loadVerse);

async function joinSundayService() {
    const nameVal = document.getElementById('visitor-name').value;
    const phoneVal = document.getElementById('visitor-phone').value;

    if (!nameVal || !phoneVal) {
        alert("Please provide both your name and phone number.");
        return;
    }

    const message = `Healing River: Welcome ${nameVal}! We are looking forward to seeing you this Sunday at 10:00 AM. God bless you!`;

    // sendChurchSMS is the function we built earlier with the Texin API Key
    const success = await sendChurchSMS(phoneVal.trim(), message);

    if (success) {
        alert("Registration Successful! Check your phone for a confirmation.");
        document.getElementById('visitor-name').value = "";
        document.getElementById('visitor-phone').value = "";
    } else {
        alert("SMS Gateway is busy. Please try again in a moment.");
    }
}

/* Placeholder Logic for Frontend Demo */

function joinSundayService() {
    const btn = document.querySelector('.btn-submit');
    if (!btn) return;

    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    // Simulate a brief network delay
    setTimeout(() => {
        alert("Thank you for your interest! The Sunday Registration feature is coming soon.");
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1000);
}

function processGiving() {
    const btn = document.querySelector('.btn-give');
    if (!btn) return;

    const originalText = btn.innerText;
    btn.innerText = "Connecting to M-Pesa...";
    btn.disabled = true;

    setTimeout(() => {
        alert("Giving Portal: This feature is currently under maintenance. Please use our physical Paybill 000000 for now.");
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1500);
}

function showComingSoon() {
    const btn = document.getElementById('giving-btn');
    const originalText = btn.innerText;

    // Visual feedback that the button was pressed
    btn.innerText = "Connecting...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    setTimeout(() => {
        alert("Healing River Giving Portal: This feature is coming soon! Please use our physical offering boxes or Paybill in the meantime.");
        
        // Reset the button
        btn.innerText = originalText;
        btn.style.opacity = "1";
        btn.disabled = false;
    }, 8000); // 0.8 second delay smooth
}

async function sendContactSMS() {
    // 1. Grab values from your form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const userMsg = document.getElementById('message').value;
    const btn = document.getElementById('contact-btn');

    // 2. Simple Validation
    if (!name || !email || !userMsg) {
        alert("Please fill in all required fields.");
        return;
    }

    // 3. UI Feedback
    btn.innerText = "Sending...";
    btn.disabled = true;

    // 4. Construct the message for YOU (the admin)
    const alertForAdmin = `Church Web Msg: ${name} (${email}) Subject: ${subject}. Message: ${userMsg}`;

    // 5. YOUR Phone Number
    const adminPhone = "2547XXXXXXXX"; // Replace with your number

    // 6. Call the SMS function we built earlier
    const success = await sendChurchSMS(adminPhone, alertForAdmin);

    if (success) {
        alert("Blessings! Your message has been sent to our team.");
        document.getElementById('contact-form').reset(); // Clears the form
    } else {
        alert("There was an issue sending your message. Please try again.");
    }

    btn.innerText = "Send Message";
    btn.disabled = false;
}

// Function to fetch a completely random verse on every load
async function fetchNewVerse() {
    const verseElement = document.getElementById('random-verse-text');
    const refElement = document.getElementById('random-verse-ref');

    try {
        // We use the 'random' endpoint so it's different every time
        const response = await fetch('https://bible-api.com/?random=verse');
        const data = await response.json();

        verseElement.innerText = `"${data.text.trim()}"`;
        refElement.innerText = `- ${data.reference}`;
    } catch (error) {
        verseElement.innerText = "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.";
        refElement.innerText = "- Joshua 1:9";
    }
}

// run when the page opens to ensure we get a fresh verse every time
window.addEventListener('load', fetchNewVerse);