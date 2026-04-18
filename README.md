# Healing River

This is a simple static website for Healing River Ministries. It includes pages for home, about, ministries, giving, and contact, as well as client-side features such as daily inspiration and SMS-related actions.

## Project structure

- `index.html` - home page with service registration, daily inspiration, and SMS subscription sections.
- `about.html` - information about the ministry and leadership.
- `ministries.html` - details about ministry groups.
- `give.html` - giving information and options.
- `contact.html` - contact page with a message form.
- `script.js` - client-side JavaScript for page interactions and API calls.
- `style.css` - site styling.
- `script.test.js` - Jest tests for the JavaScript helper functions.
- `package.json` - Node package settings for running tests.

## Features

- Daily inspiration is loaded from the Bible API based on the current day.
- A random verse is loaded separately as the "verse of the moment."
- SMS-related functions are present to send messages through the configured SMS gateway.

## Notes

- The daily inspiration feature currently uses a small set of hard-coded verse references and cycles through them by day.
- The contact and subscription features are designed for client-side usage and rely on browser capabilities.
