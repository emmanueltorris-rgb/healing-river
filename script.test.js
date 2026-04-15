const { formatSmsMessage } = require('./script');

describe('Healing River SMS System', () => {
    
    test('formats a message correctly with a name', () => {
        const result = formatSmsMessage('Peter', 'We look forward to seeing you.');
        expect(result).toBe('Healing River: Welcome Peter! We look forward to seeing you.');
    });

    test('handles empty names gracefully', () => {
        const result = formatSmsMessage('', 'God bless you.');
        expect(result).toBe('Healing River: God bless you.');
    });

    test('is consistent with the brand prefix', () => {
        const result = formatSmsMessage('Sarah', 'Join us!');
        expect(result).toMatch(/^Healing River:/);
    });
});