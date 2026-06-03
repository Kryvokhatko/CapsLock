import { Page, Locator } from '@playwright/test';

export class StepSorryPage {
    readonly page: Page;
    readonly formIndex: number;
    
    private readonly sorryMessage: Locator;
    private readonly emailInput: Locator;
    private readonly submitButton: Locator;
    private readonly confirmationMessage: Locator;
    
    constructor(page: Page, formIndex: number = 0) {
        this.page = page;
        this.formIndex = formIndex;
        
        const stepContainer = page.locator('.steps.step-sorry').nth(formIndex);
        // Avoid apostrophe encoding issues by matching a substring without special chars
        this.sorryMessage = stepContainer.getByText(/Sorry, unfortunately/i);
        // Sorry step uses input[type="text"][name="email"] — identified by placeholder
        this.emailInput = stepContainer.getByPlaceholder('Email Address');
        this.submitButton = stepContainer.getByRole('button', { name: 'Submit' });
        this.confirmationMessage = stepContainer.getByText(/Thank you for your/i);
    }
    
    async isVisible(): Promise<boolean> {
        // Use waitFor rather than isVisible() — transition to the sorry screen takes some time after ZIP availability animation completes. waitFor retries within the timeout.
        try {
            await this.emailInput.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
    
    async getSorryMessage(): Promise<string | null> {
        const isVisible = await this.sorryMessage.isVisible().catch(() => false);
        if(!isVisible) return null;
        const text = await this.sorryMessage.textContent();
        if (text == null) return null;
        return text.trim();
    }
    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }
    
    async submit(): Promise<void> {
        await this.submitButton.click();
    }
    
    async getConfirmationText(): Promise<string | null> {
        const isVisible = await this.confirmationMessage.isVisible().catch(() => false);
        return isVisible ? (await this.confirmationMessage.textContent())?.trim() ?? null : null;
    }
}