import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StepPhonePage extends BasePage {
  private readonly stepContainer = this.page.locator(".steps.step-5").nth(this.formIndex);
  private readonly phoneInput: Locator = this.stepContainer.getByPlaceholder("(XXX)XXX-XXXX");
  private readonly submitButton: Locator = this.stepContainer.getByRole("button", {
    name: "Submit Your Request",
  });

  constructor(page: Page, formIndex: number = 0) {
    super(page, formIndex);    
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  async submit(): Promise<void> {
    await this.click(this.submitButton);
  }

  async isVisible(): Promise<boolean> {
    return this.phoneInput.isVisible();
  }
}
