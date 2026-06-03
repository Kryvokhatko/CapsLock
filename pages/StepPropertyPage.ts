import { Page, Locator } from '@playwright/test';

export class StepPropertyPage {
    readonly page: Page;
    readonly formIndex: number;
    
    private readonly stepContainer: Locator;
    private readonly nextButton: Locator;
    private readonly errorMessage: Locator;
    
    constructor(page: Page, formIndex: number = 0) {
        this.page = page;
        this.formIndex = formIndex;
        this.stepContainer = page.locator('.steps.step-3').nth(formIndex);
        this.nextButton = this.stepContainer.getByRole('button', { name: 'Next' });
        this.errorMessage = this.stepContainer.locator('.helpBlock');
    }

    async selectProperty(propertyType: string): Promise<void> {
        // Real radio inputs linked to labels via for/id — getByLabel is semantic and accessible
        // Label text observed in DOM: "Owned House / Condo", "Rental Property", "Mobile Home"
        const labelMap: Record<string, string> = {
            'owned house/condo': 'Owned House / Condo',
            'owned':             'Owned House / Condo',
            'rental property':   'Rental Property',
            'rental':            'Rental Property',
            'mobile home':       'Mobile Home',
            'mobile':            'Mobile Home',
        };
        
        const label = labelMap[propertyType.toLowerCase()];
        if (!label) throw new Error(`Unknown property type: "${propertyType}"`);
        // Radio inputs are CSS-hidden; real user interaction is clicking the visible label
        await this.stepContainer.locator('label').filter({ hasText: label }).click();
    }
    
    async submit(): Promise<void> {
        await this.nextButton.click();
    }
    
    async getErrorText(): Promise<string | null> {
        const isVisible = await this.errorMessage.isVisible().catch(() => false);
        return isVisible ? (await this.errorMessage.textContent())?.trim() ?? null : null;
    }
    
    async isVisible(): Promise<boolean> {
        return this.stepContainer.locator('label').filter({ hasText: 'Owned House / Condo' }).isVisible();
    }
}