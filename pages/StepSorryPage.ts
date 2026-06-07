import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StepSorryPage extends BasePage {
  private readonly stepContainer = this.page.locator(".steps.step-sorry").nth(this.formIndex);
  // Avoid apostrophe encoding issues by matching a substring without special chars
  private readonly sorryMessage: Locator = this.stepContainer.getByText(/Sorry, unfortunately/i);
  // Sorry step uses input[type="text"][name="email"] — identified by placeholder
  private readonly emailInput: Locator = this.stepContainer.getByPlaceholder("Email Address");
  private readonly submitButton: Locator = this.stepContainer.getByRole("button", { name: "Submit" });
  private readonly confirmationMessage: Locator = this.stepContainer.getByText(/Thank you for your/i);

  constructor(page: Page, formIndex: number = 0) {
    super(page, formIndex);
  }

  async isVisible(): Promise<boolean> {
    // Use waitFor rather than isVisible() — transition to the sorry screen takes some time after ZIP availability animation completes. waitFor retries within the timeout.
    try {
      await this.emailInput.waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getSorryMessage(): Promise<string | null> {
    const isVisible = await this.sorryMessage.isVisible().catch(() => false);
    if (!isVisible) return null;
    const text = await this.sorryMessage.textContent();
    if (text == null) return null;
    return text.trim();
  }
  
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async submit(): Promise<void> {
    await this.click(this.submitButton);
  }

  async getConfirmationText(): Promise<string | null> {
    return this.getVisibleText(this.confirmationMessage);
  }
}
