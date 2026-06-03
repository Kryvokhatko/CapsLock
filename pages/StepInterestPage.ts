import { Page, Locator } from '@playwright/test';

export class StepInterestPage {
    readonly page: Page;
    readonly formIndex: number;
    
    private readonly stepContainer: Locator;
    private readonly nextButton: Locator;
    private readonly errorMessage: Locator;
    
    constructor(page: Page, formIndex: number = 0) {
        this.page = page;
        this.formIndex = formIndex;
        
        this.stepContainer = page.locator('.steps.step-2').nth(formIndex);
        this.nextButton = this.stepContainer.getByRole('button', { name: 'Next' });
        this.errorMessage = this.stepContainer.locator('.helpBlock');
    }
    
    async checkOption(option: string): Promise<void> {
        // Checkboxes are CSS-hidden; real user interaction is clicking the visible label
        await this.stepContainer.locator('label').filter({ hasText: option }).click();
    }
    
    async uncheckOption(option: string): Promise<void> {
        // Click label again to deselect
        await this.stepContainer.locator('label').filter({ hasText: option }).click();
    }
    
    async submit(): Promise<void> {
        await this.nextButton.click();
    }
    
    async getErrorText(): Promise<string | null> {
        const isVisible = await this.errorMessage.isVisible().catch(() => false);
        return isVisible ? (await this.errorMessage.textContent())?.trim() ?? null : null;
    }
    
    async isVisible(): Promise<boolean> {
        return this.stepContainer.locator('label').filter({ hasText: 'Independence' }).isVisible();
    }
}