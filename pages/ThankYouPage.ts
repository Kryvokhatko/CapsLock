import { Page, Locator } from '@playwright/test';

export class ThankYouPage {
    readonly page: Page;
    private heading: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.heading = page.locator('h1, h2').filter({ hasText: /Thank You|thank you/i });
    }
    
    async getUrl(): Promise<string> {
        return this.page.url();
    }
    
    async getHeading(): Promise<string | null> {
        const isVisible = await this.heading.isVisible().catch(() => false);
        if (isVisible) {
            return await this.heading.textContent();
        }
        return null;
    }
    
    async isVisible(): Promise<boolean> {
        return await this.heading.isVisible().catch(() => false);
    }
}