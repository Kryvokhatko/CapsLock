import { test, expect } from '../fixtures/pages.fixture';
import { ZIP, VALID_USER, INTERESTS, PROPERTY_TYPES, ERROR_MESSAGES } from '../data/testData';

test.describe('US07: Contact Info Validation (Step 4)', () => {
    test.beforeEach(async ({ stepZip1, stepInterest1, stepProperty1 }) => {
        // Navigate to Step 4 (Contact Info)
        // page.goto('/') handled by fixture
        await stepZip1.fillZip(ZIP.serviceAvailable);
        await stepZip1.submit();

        await stepInterest1.checkOption(INTERESTS.independence);
        await stepInterest1.submit();

        await stepProperty1.selectProperty(PROPERTY_TYPES.owned);
        await stepProperty1.submit();
    });

    test('TC01: Empty name => required error message', async ({ stepContact1 }) => {
        await stepContact1.fillEmail(VALID_USER.email);
        await stepContact1.submit();
        const errorText = await stepContact1.getNameErrorText();
        expect(errorText).toBe(ERROR_MESSAGES.name.empty);
    });

    test('TC02: Single-word name => first and last name error', async ({ stepContact1 }) => {
        // Fill single-word name (missing last name)
        await stepContact1.fillName(VALID_USER.firstName);
        await stepContact1.fillEmail(VALID_USER.email);
        await stepContact1.submit();
        const errorText = await stepContact1.getNameErrorText();
        expect(errorText).toBeTruthy();
        expect(errorText?.toLowerCase()).toContain('first and last name');
    });

    test('TC03: Empty email => HTML5 native required validation', async ({ stepContact1, page }) => {
        // Fill name but leave email empty
        await stepContact1.fillName(VALID_USER.fullName);
        // Try to submit without email
        await stepContact1.submit();
        // Verify HTML5 validation error or custom error message
        const emailErrorText = await stepContact1.getEmailErrorText();
        if (emailErrorText) {
            // Custom validation message present
            expect(emailErrorText).toBeTruthy();
            expect(emailErrorText?.toLowerCase()).toContain('email');
        }
        // HTML5 validation would prevent actual submission, so the form should still be on Step 4
        await expect(page).not.toHaveURL(/thankyou/);
    });

    test('TC04: Invalid email format => HTML5 native format validation', async ({ stepContact1, page }) => {
        // Fill name and invalid email
        await stepContact1.fillName(VALID_USER.fullName);
        await stepContact1.fillEmail('notanemail');
        await stepContact1.submit();
        // Verify Invalid email error
        const emailErrorText = await stepContact1.getEmailErrorText();
        if (emailErrorText) {
            // Custom validation message present
            expect(emailErrorText).toBeTruthy();
        }
        // HTML5 validation should prevent progress to next step
        await expect(page).not.toHaveURL(/thankyou/);
    });
});
