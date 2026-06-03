import { Page, Locator } from '@playwright/test';

export class StepZipPage {
    readonly page: Page;
    readonly formIndex: number;

    private readonly zipInput: Locator;
    private readonly nextButton: Locator;
    private readonly errorMessage: Locator;
    private readonly stepAnimation: Locator;

    constructor(page: Page, formIndex: number = 0) {
       this.page = page;
       this.formIndex = formIndex;
       
       const stepContainer = page.locator('.steps.step-1').nth(formIndex);
       this.zipInput = stepContainer.getByPlaceholder('Enter ZIP Code');
       this.nextButton = stepContainer.getByRole('button', { name: 'Next' });
       this.errorMessage = stepContainer.locator('.helpBlock');
       // Explicit wait target: ZIP check is async; no aria state change to hook onto
       this.stepAnimation = page.locator('.step-anim');
    }

    async fillZip(zip: string): Promise<void> {
      await this.zipInput.fill(zip);
    }

    async submit(): Promise<void> {
      await this.nextButton.click();
      // Wait for ZIP availability animation to complete before proceeding
      await this.stepAnimation.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {
      // Animation may not appear for invalid ZIPs that fail client-side validation immediately
      });
    }

    async getErrorText(): Promise<string | null> {
        const isVisible = await this.errorMessage.isVisible().catch(() => false);
        return isVisible ? (await this.errorMessage.textContent())?.trim() ?? null : null;
    }

    async isVisible(): Promise<boolean> {
        return this.zipInput.isVisible();
    }
}