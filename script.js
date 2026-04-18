function formatSmsMessage(name, baseMessage) {
    if (!name) return `Healing River: ${baseMessage}`;
    return `Healing River: Welcome ${name}! ${baseMessage}`;
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

function getDailyVerseReference() {
    const verses = [
        'john+4:14',
        'psalm+23:1',
        'isaiah+41:10',
        'philippians+4:13',
        'jeremiah+29:11',
        'proverbs+3:5',
        'matthew+11:28',
        'psalm+46:1',
        '2+corinthians+12:9',
        'romans+8:28'
    ];
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return verses[dayOfYear % verses.length];
}

async function loadDailyInspiration() {
    const textTarget = document.getElementById('bible-text');
    const refTarget = document.getElementById('bible-ref');
    
    if (!textTarget || !refTarget) return;

    const verseRef = getDailyVerseReference();
    try {
        const response = await fetch(`https://bible-api.com/${verseRef}`);
        const data = await response.json();
        textTarget.innerText = `"${data.text.trim()}"`;
        refTarget.innerText = `— ${data.reference}`;
    } catch (err) {
        textTarget.innerText = "But whoever drinks the water I give them will never thirst.";
        refTarget.innerText = "— John 4:14";
    }
}

// verse of the moment
async function fetchRandomVerse() {
    const verseElement = document.getElementById('random-verse-text');
    const refElement = document.getElementById('random-verse-ref');
    if (!verseElement) return;

    try {
        const response = await fetch('https://bible-api.com/?random=verse');
        const data = await response.json();
        verseElement.innerText = `"${data.text.trim()}"`;
        refElement.innerText = `- ${data.reference}`;
    } catch (error) {
        verseElement.innerText = "Be strong and courageous.";
        refElement.innerText = "- Joshua 1:9";
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

    const fullMsg = `Healing River Daily Grace: ${verseText} ${verseRef}`;
    const success = await sendChurchSMS(phoneInput.value.trim(), fullMsg);
    
    if (success) {
        alert("Subscribed! Your verse is on the way.");
        phoneInput.value = ""; 
    } else {
        alert("Could not subscribe at this time.");
    }
}

async function unsubscribeFromVerse() {
    const phoneInput = document.getElementById('member-phone');
    if (!phoneInput || !phoneInput.value) {
        alert("Enter your phone number to unsubscribe.");
        return;
    }

    const goodbyeMsg = "Healing River: You have been unsubscribed from Daily Grace.";
    const success = await sendChurchSMS(phoneInput.value.trim(), goodbyeMsg);
    
    if (success) {
        alert("Unsubscribed successfully.");
        phoneInput.value = "";
    }
}

async function joinSundayService() {
    const nameInput = document.getElementById('visitor-name');
    const phoneInput = document.getElementById('visitor-phone');
    const btn = document.querySelector('.btn-submit');

    if (!nameInput.value || !phoneInput.value) {
        alert("Please provide both your name and phone number.");
        return;
    }

    btn.innerText = "Processing...";
    btn.disabled = true;

    const message = formatSmsMessage(nameInput.value, "We look forward to seeing you this Sunday at 10:00 AM.");
    const success = await sendChurchSMS(phoneInput.value.trim(), message);

    if (success) {
        alert("Registration Successful!");
        nameInput.value = "";
        phoneInput.value = "";
    } else {
        alert("SMS Gateway busy. Please try again.");
    }

    btn.innerText = "Register for Sunday";
    btn.disabled = false;
}

// Runs everything on page load
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        loadDailyInspiration();
        fetchRandomVerse();
    });
}

if (typeof module !== 'undefined') {
    module.exports = { formatSmsMessage, sendChurchSMS };
}