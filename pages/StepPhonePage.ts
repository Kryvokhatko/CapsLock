import { Page, Locator } from "@playwright/test";

export class StepPhonePage {
  readonly page: Page;
  readonly formIndex: number;

  private readonly phoneInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page, formIndex: number = 0) {
    this.page = page;
    this.formIndex = formIndex;

    const stepContainer = page.locator(".steps.step-5").nth(formIndex);
    this.phoneInput = stepContainer.getByPlaceholder("(XXX)XXX-XXXX");
    this.submitButton = stepContainer.getByRole("button", {
      name: "Submit Your Request",
    });
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async isVisible(): Promise<boolean> {
    return this.phoneInput.isVisible();
  }
}
