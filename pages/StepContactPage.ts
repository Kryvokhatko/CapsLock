import { Page, Locator } from "@playwright/test";

export class StepContactPage {
  readonly page: Page;
  readonly formIndex: number;

  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly nextButton: Locator;
  private readonly nameError: Locator;

  constructor(page: Page, formIndex: number = 0) {
    this.page = page;
    this.formIndex = formIndex;

    // Step 4 has no <label> elements — inputs identified by placeholder
    const stepContainer = page.locator(".steps.step-4").nth(formIndex);
    this.nameInput = stepContainer.getByPlaceholder("Enter Your Name");
    this.emailInput = stepContainer.getByPlaceholder("Enter Your Email");
    this.nextButton = stepContainer.getByRole("button", {name: "Go To Estimate",});
    // Name uses a custom .helpBlock error; email relies on native HTML5 validation
    this.nameError = stepContainer.locator(".helpBlock").nth(0);
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
    const isVisible = await this.nameError.isVisible().catch(() => false);
    return isVisible
      ? ((await this.nameError.textContent())?.trim() ?? null)
      : null;
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
