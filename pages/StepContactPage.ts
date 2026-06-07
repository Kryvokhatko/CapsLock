import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StepContactPage extends BasePage {
  // Step 4 has no <label> elements — inputs identified by placeholder
  private readonly stepContainer: Locator = this.page.locator(".steps.step-4").nth(this.formIndex);
  private readonly nameInput: Locator = this.stepContainer.getByPlaceholder("Enter Your Name");
  private readonly emailInput: Locator = this.stepContainer.getByPlaceholder("Enter Your Email");
  private readonly nextButton: Locator = this.stepContainer.getByRole("button", {name: "Go To Estimate",});
  // Name uses a custom .helpBlock error; email relies on native HTML5 validation
  private readonly nameError: Locator = this.stepContainer.locator(".helpBlock").nth(0);

  constructor(page: Page, formIndex: number = 0) {
    super(page, formIndex);
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async submit(): Promise<void> {
    await this.nextButton.click();
  }

  async getNameErrorText(): Promise<string | null> {
    return this.getVisibleText(this.nameError);
  }

  // Native HTML5 constraint-validation state of the email input
  async getEmailValidity(): Promise<{
    valid: boolean;
    typeMismatch: boolean;
    message: string;
  }> {
    return this.emailInput.evaluate((el: HTMLInputElement) => ({
      valid: el.validity.valid,
      typeMismatch: el.validity.typeMismatch,
      message: el.validationMessage,
    }));
  }

  async isVisible(): Promise<boolean> {
    return this.nameInput.isVisible();
  }
}
