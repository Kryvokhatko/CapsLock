import { test, expect } from '../fixtures/pages.fixture';
import { ZIP, VALID_USER } from '../data/testData';

test.describe('US03: Out-of-Area ZIP Flow', () => {
    test('TC01: Enter out-of-area ZIP (11111) => sorry message is shown', async ({ stepZip1, stepSorry1 }) => {
        // Step 1: Enter out-of-area ZIP
        await stepZip1.fillZip(ZIP.outOfArea);
        await stepZip1.submit();
        // Verify Sorry message is displayed
        const isSorryVisible = await stepSorry1.isVisible();
        expect(isSorryVisible).toBe(true);
        const sorryMessage = await stepSorry1.getSorryMessage();
        expect(sorryMessage).toBeTruthy();
        expect(sorryMessage?.toLowerCase()).toContain('sorry');
    });

    test('TC02: Submit valid email in opt-in field => confirmation message displayed', async ({ stepZip1, stepSorry1 }) => {
        // Step 1: Enter out-of-area ZIP
        await stepZip1.fillZip(ZIP.outOfArea);
        await stepZip1.submit();
        // Step 2: Fill email in the opt-in field on the sorry screen
        await stepSorry1.fillEmail(VALID_USER.email);
        await stepSorry1.submit();
        // Verify: Confirmation message is displayed
        const confirmationText = await stepSorry1.getConfirmationText();
        expect(confirmationText).toBeTruthy();
        expect(confirmationText?.toLowerCase()).toContain('thank');
    });
});
