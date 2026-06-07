import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StepInterestPage extends BasePage {
  private readonly stepContainer: Locator = this.page.locator(".steps.step-2").nth(this.formIndex);
  private readonly nextButton: Locator = this.stepContainer.getByRole("button", { name: "Next" });

  constructor(page: Page, formIndex: number = 0) {
    super (page, formIndex);
  }

  async checkOption(option: string): Promise<void> {
    // Type checkboxes are CSS-hidden, real user interacts by clicking the visible label
    await this.stepContainer.locator("label").filter({ hasText: option }).click();
  }

  async submit(): Promise<void> {
    await this.click(this.nextButton);
  }

  async isVisible(): Promise<boolean> {
    return this.stepContainer.locator("label").filter({ hasText: "Independence" }).isVisible();
  }
}
