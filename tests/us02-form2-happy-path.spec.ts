import { test, expect } from "../fixtures/pages.fixture";
import {
  ZIP,
  VALID_USER,
  INTERESTS,
  PROPERTY_TYPES,
  CONFIRMATION_MESSAGES,
} from "../data/testData";

test.describe("US02: Form #2 - Happy Path", () => {
  test("TC01: Complete all 5 steps with valid data via Form #2 (second DOM copy) => /thankyou", async ({
    stepZip2,
    stepInterest2,
    stepProperty2,
    stepContact2,
    stepPhone2,
    thankYouPage,
  }) => {
    // Step 1 Enter ZIP in Form #2
    await stepZip2.fillZip(ZIP.serviceAvailable);
    await stepZip2.submit();
    // Step 2 Select interests in Form #2
    await stepInterest2.checkOption(INTERESTS.therapy);
    await stepInterest2.submit();
    // Step 3 Select property type in Form #2
    await stepProperty2.selectProperty(PROPERTY_TYPES.rental);
    await stepProperty2.submit();
    // Step 4 Enter contact info in Form #2
    await stepContact2.fillName(VALID_USER.fullName);
    await stepContact2.fillEmail(VALID_USER.email);
    await stepContact2.submit();
    // Step 5 Enter phone in Form #2
    await stepPhone2.fillPhone(VALID_USER.phone);
    await stepPhone2.submit();
    // Verify Thank you page
    await expect(thankYouPage.page).toHaveURL(
      new RegExp(CONFIRMATION_MESSAGES.thankYouUrl),
    );
    const heading = await thankYouPage.getHeading();
    expect(heading).toBeTruthy();
    expect(heading?.toLowerCase()).toContain("thank");
  });

  test("TC02: Advancing Form #2 keeps Form #1 synchronized to the same step", async ({
    stepZip2,
    stepInterest1,
    stepInterest2,
    stepProperty1,
    stepProperty2,
    stepContact1,
    stepContact2,
    stepPhone1,
    stepPhone2,
    thankYouPage,
  }) => {
    // The page renders two copies of the form (Form #1 and Form #2) backed by shared state,
    // so progressing Form #2 must advance Form #1 to the same step.
    // Step 1 Enter ZIP in Form #2
    await stepZip2.fillZip(ZIP.serviceAvailable);
    await stepZip2.submit();
    // Form #1 is now on Step 2 (Interest) as well — poll to allow the step transition to settle
    await expect.poll(() => stepInterest1.isVisible()).toBe(true);
    // Step 2 Select interest in Form #2
    await stepInterest2.checkOption(INTERESTS.independence);
    await stepInterest2.submit();
    // Form #1 is now on Step 3 (Property type)
    await expect.poll(() => stepProperty1.isVisible()).toBe(true);
    // Step 3 Select property in Form #2
    await stepProperty2.selectProperty(PROPERTY_TYPES.mobile);
    await stepProperty2.submit();
    // Form #1 is now on Step 4 (Contact info)
    await expect.poll(() => stepContact1.isVisible()).toBe(true);
    // Step 4 Enter contact info in Form #2
    await stepContact2.fillName(VALID_USER.fullName);
    await stepContact2.fillEmail(VALID_USER.email);
    await stepContact2.submit();
    // Form #1 is now on Step 5 (Phone)
    await expect.poll(() => stepPhone1.isVisible()).toBe(true);
    // Step 5 Enter phone in Form #2
    await stepPhone2.fillPhone(VALID_USER.phone);
    await stepPhone2.submit();
    // Verify Thank you page reached via Form #2
    await expect(thankYouPage.page).toHaveURL(
      new RegExp(CONFIRMATION_MESSAGES.thankYouUrl),
    );
    const heading = await thankYouPage.getHeading();
    expect(heading).toBeTruthy();
    expect(heading?.toLowerCase()).toContain("thank");
  });
});
