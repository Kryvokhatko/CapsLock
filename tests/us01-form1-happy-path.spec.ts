import { test, expect } from "../fixtures/pages.fixture";
import {
  ZIP,
  VALID_USER,
  INTERESTS,
  PROPERTY_TYPES,
  CONFIRMATION_MESSAGES,
} from "../data/testData";

test.describe("US01: Form #1 - Happy Path", () => {
  test("TC01: Complete all 5 steps with valid data via Form #1 => /thankyou", async ({
    stepZip1,
    stepInterest1,
    stepProperty1,
    stepContact1,
    stepPhone1,
    thankYouPage,
  }) => {
    // Step 1 Enter ZIP
    await stepZip1.fillZip(ZIP.serviceAvailable);
    await stepZip1.submit();
    // Step 2 Select interests
    await stepInterest1.checkOption(INTERESTS.independence);
    await stepInterest1.checkOption(INTERESTS.safety);
    await stepInterest1.submit();
    // Step 3 Select property type
    await stepProperty1.selectProperty(PROPERTY_TYPES.owned);
    await stepProperty1.submit();
    // Step 4 Enter contact info
    await stepContact1.fillName(VALID_USER.fullName);
    await stepContact1.fillEmail(VALID_USER.email);
    await stepContact1.submit();
    // Step 5 Enter phone
    await stepPhone1.fillPhone(VALID_USER.phone);
    await stepPhone1.submit();
    // Verify Thank you page
    await expect(thankYouPage.page).toHaveURL(
      new RegExp(CONFIRMATION_MESSAGES.thankYouUrl),
    );
    const heading = await thankYouPage.getHeading();
    expect(heading).toBeTruthy();
    expect(heading?.toLowerCase()).toContain("thank");
  });

  test("TC02: Each step shows its own question heading, advancing through all 5 steps", async ({
    page,
    stepZip1,
    stepInterest1,
    stepProperty1,
    stepContact1,
    stepPhone1,
  }) => {
    // Step 1 ZIP question is visible
    await expect(
      page.locator(".steps.step-1").first().getByText("What is your ZIP Code?"),
    ).toBeVisible();
    await stepZip1.fillZip(ZIP.serviceAvailable);
    await stepZip1.submit();
    // Step 2 Interest question is visible
    await expect(
      page
        .locator(".steps.step-2")
        .first()
        .getByText(/Why are you interested/i),
    ).toBeVisible();
    await stepInterest1.checkOption(INTERESTS.independence);
    await stepInterest1.submit();
    // Step 3 Property type question is visible
    await expect(
      page
        .locator(".steps.step-3")
        .first()
        .getByText(/What type of property/i),
    ).toBeVisible();
    await stepProperty1.selectProperty(PROPERTY_TYPES.owned);
    await stepProperty1.submit();
    // Step 4 Contact info question is visible
    await expect(
      page.locator(".steps.step-4").first().getByPlaceholder("Enter Your Name"),
    ).toBeVisible();
    await stepContact1.fillName(VALID_USER.fullName);
    await stepContact1.fillEmail(VALID_USER.email);
    await stepContact1.submit();
    // Step 5 Phone step heading is visible
    await expect(
      page.locator(".steps.step-5").first().getByText("LAST STEP!"),
    ).toBeVisible();
    await stepPhone1.fillPhone(VALID_USER.phone);
    await stepPhone1.submit();
    // Final thank you page reached
    await expect(page).toHaveURL(/thankyou/);
  });
});
