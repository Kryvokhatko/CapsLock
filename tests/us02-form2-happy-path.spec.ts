import { test, expect } from '../fixtures/pages.fixture';
import { ZIP, VALID_USER, INTERESTS, PROPERTY_TYPES, CONFIRMATION_MESSAGES } from '../data/testData';

test.describe('US02: Form #2 - Happy Path', () => {
    test('TC01: Complete all 5 steps with valid data via Form #2 (second DOM copy) => /thankyou', async ({ stepZip2,  stepInterest2, stepProperty2, stepContact2, stepPhone2, thankYouPage }) => {
        // Step 1 Enter ZIP in Form #2
        await stepZip2.fillZip(ZIP.serviceAvailable);
        await stepZip2.submit();
        // Step 2 Select interests in Form #2
        await stepInterest2.checkOption(INTERESTS.therapy);
        await stepInterest2.submit();
        // Step 3 Select property type in Form #2
        await stepProperty2.selectProperty(PROPERTY_TYPES.rental);
        await stepProperty2.submit();
        // Step 4 Enter contact info in Form #2
        await stepContact2.fillName(VALID_USER.fullName);
        await stepContact2.fillEmail(VALID_USER.email);
        await stepContact2.submit();
        // Step 5 Enter phone in Form #2
        await stepPhone2.fillPhone(VALID_USER.phone);
        await stepPhone2.submit();
        // Verify Thank you page
        await expect(thankYouPage.page).toHaveURL(new RegExp(CONFIRMATION_MESSAGES.thankYouUrl));
        const heading = await thankYouPage.getHeading();
        expect(heading).toBeTruthy();
        expect(heading?.toLowerCase()).toContain('thank');
    });

    test('TC02: Change of state in Form #2 impact Form #1 state', async ({ stepZip2, stepInterest1, stepInterest2, stepProperty1, stepProperty2, stepContact1, stepContact2, stepPhone1, stepPhone2, thankYouPage }) => {
        // Leave Form #1 untouched, proceed only with Form #2
        // Step 1 Enter ZIP in Form #2 only
        await stepZip2.fillZip(ZIP.serviceAvailable);
        await stepZip2.submit();
        // Verify Form #1 has the same state, "Independence" is visible
        await stepInterest1.isVisible();
        // Step 2 Select interest in Form #2
        await stepInterest2.checkOption(INTERESTS.independence);
        await stepInterest2.submit();
        // Verify Form #1 has the same state, "Owned House / Condo" is visible
        await stepProperty1.isVisible();
        // Step 3 Select property in Form #2
        await stepProperty2.selectProperty(PROPERTY_TYPES.mobile);
        await stepProperty2.submit();
        // Verify Form #1 has the same state, "Name" field is visible
        await stepContact1.isVisible();
        // Step 4 Enter contact info in Form #2
        await stepContact2.fillName(VALID_USER.fullName);
        await stepContact2.fillEmail(VALID_USER.email);
        await stepContact2.submit();
        // Verify Form #1 has the same state, "Phone Number" field is visible
        await stepPhone1.isVisible();
        // Step 5 Enter phone in Form #2
        await stepPhone2.fillPhone(VALID_USER.phone);
        await stepPhone2.submit();
        // Verify Thank you page reached via Form #2
        await expect(thankYouPage.page).toHaveURL(new RegExp(CONFIRMATION_MESSAGES.thankYouUrl));
        const heading = await thankYouPage.getHeading();
        expect(heading).toBeTruthy();
        expect(heading?.toLowerCase()).toContain('thank');
    });
});
