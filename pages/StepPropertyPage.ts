import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StepPropertyPage extends BasePage {
  private readonly stepContainer: Locator = this.page.locator(".steps.step-3").nth(this.formIndex);
  private readonly nextButton: Locator = this.stepContainer.getByRole("button", { name: "Next" });

  constructor(page: Page, formIndex: number = 0) {
    super(page, formIndex);
  }

  async selectProperty(propertyType: string): Promise<void> {
    //label normalization pattern to handle the gap between what users might type vs what the actual DOM contains.
    // Type radio inputs => getByLabel is semantic and accessible
    // Label text observed in DOM: "Owned House / Condo", "Rental Property", "Mobile Home"
    const labelMap: Record<string, string> = {
      "owned house/condo": "Owned House / Condo",
      owned: "Owned House / Condo",
      "rental property": "Rental Property",
      rental: "Rental Property",
      "mobile home": "Mobile Home",
      mobile: "Mobile Home",
    };

    const label = labelMap[propertyType.toLowerCase()];
    if (!label) throw new Error(`Unknown property type: "${propertyType}"`);
    // Radio inputs are CSS-hidden; real user interaction is clicking the visible label
    await this.stepContainer.locator("label").filter({ hasText: label }).click();
  }

  async submit(): Promise<void> {
    await this.click(this.nextButton);
  }

  async isVisible(): Promise<boolean> {
    return this.stepContainer.locator("label").filter({ hasText: "Owned House / Condo" }).isVisible();
  }
}
