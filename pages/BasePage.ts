import { Locator, Page } from "@playwright/test"; 

export abstract class BasePage {
    readonly page: Page;
    readonly formIndex: number;

    constructor(page: Page, formIndex: number = 0) {
        this.page = page;
        this.formIndex = formIndex;
    }

    protected async getVisibleText(locator: Locator): Promise<string | null> {
        const visible = await locator.isVisible().catch(() => false);
        if(!visible) return null;
        return (await locator.textContent())?.trim() ?? null;
    }

    protected async click(locator: Locator): Promise<void> {
        await locator.click();
    }
}