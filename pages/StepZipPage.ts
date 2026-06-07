import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StepZipPage extends BasePage {
  private readonly stepContainer = this.page.locator(".steps.step-1").nth(this.formIndex);
  private readonly zipInput: Locator = this.stepContainer.getByPlaceholder("Enter ZIP Code");
  private readonly nextButton: Locator = this.stepContainer.getByRole("button", { name: "Next" });
  private readonly errorMessage: Locator = this.stepContainer.locator(".helpBlock");
  // Explicit wait target: ZIP check is async; no aria state change to hook onto
  private readonly stepAnimation: Locator = this.page.locator(".step-anim");

  constructor(page: Page, formIndex: number = 0) {
    super(page, formIndex);
  }

  async fillZip(zip: string): Promise<void> {
    await this.zipInput.fill(zip);
  }

  async submit(): Promise<void> {
    await this.click(this.nextButton);
    // Wait for ZIP availability animation to complete before proceeding
    await this.stepAnimation.waitFor({ state: "hidden", timeout: 10000 }).catch(() => {
        // Animation may not appear for invalid ZIPs that fail client-side validation immediately
      });
  }

  async getErrorText(): Promise<string | null> {
    return this.getVisibleText(this.errorMessage);
  }

  async isVisible(): Promise<boolean> {
    return this.zipInput.isVisible();
  }
}
