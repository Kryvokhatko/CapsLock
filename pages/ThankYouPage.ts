import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ThankYouPage extends BasePage {
  private heading: Locator = this.page.locator("h1, h2").filter({ hasText: /Thank You|thank you/i });

  constructor(page: Page) {
    super(page);
  }

  async getHeading(): Promise<string | null> {
    return this.getVisibleText(this.heading);
  }

  async isVisible(): Promise<boolean> {
    return await this.heading.isVisible().catch(() => false);
  }
}
