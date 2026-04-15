const { formatSmsMessage } = require('./script');

test('formats the church welcome message correctly', () => {
    const name = "John";
    const msg = "We look forward to seeing you.";
    const expected = "Healing River: Welcome John! We look forward to seeing you.";
    
    expect(formatSmsMessage(name, msg)).toBe(expected);
});

test('handles empty names gracefully', () => {
    const result = formatSmsMessage('', 'God bless you.');
    expect(result).toBe('Healing River: God bless you.');
});