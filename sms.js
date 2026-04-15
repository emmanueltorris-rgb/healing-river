const TEXIN_API_KEY = 'texin_332bc391193ce1bf04ed2f78cb157899';
const SENDER_ID = 'TEXIN';

async function sendChurchSMS(phone, message) {
    const url = 'https://texin.co.ke/api/v1/sms/send';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: TEXIN_API_KEY,
                sender_id: SENDER_ID,
                phone_number: phone,
                message: message
            })
        });
        return await response.json();
    } catch (error) {
        console.error("SMS Delivery Failed:", error);
    }
}