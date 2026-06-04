import { Page, Locator } from "@playwright/test";

export class StepInterestPage {
  readonly page: Page;
  readonly formIndex: number;

  private readonly stepContainer: Locator;
  private readonly nextButton: Locator;

  constructor(page: Page, formIndex: number = 0) {
    this.page = page;
    this.formIndex = formIndex;

    this.stepContainer = page.locator(".steps.step-2").nth(formIndex);
    this.nextButton = this.stepContainer.getByRole("button", { name: "Next" });
  }

  async checkOption(option: string): Promise<void> {
    // Type checkboxes are CSS-hidden, real user interacts by clicking the visible label
    await this.stepContainer
      .locator("label")
      .filter({ hasText: option })
      .click();
  }

  async submit(): Promise<void> {
    await this.nextButton.click();
  }

  async isVisible(): Promise<boolean> {
    return this.stepContainer
      .locator("label")
      .filter({ hasText: "Independence" })
      .isVisible();
  }
}
