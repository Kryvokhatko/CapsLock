import { test as base } from "@playwright/test";
import { StepZipPage } from "../pages/StepZipPage";
import { StepInterestPage } from "../pages/StepInterestPage";
import { StepPropertyPage } from "../pages/StepPropertyPage";
import { StepContactPage } from "../pages/StepContactPage";
import { StepPhonePage } from "../pages/StepPhonePage";
import { StepSorryPage } from "../pages/StepSorryPage";
import { ReviewsSection } from "../pages/ReviewsSection";
import { ThankYouPage } from "../pages/ThankYouPage";

type PagesFixture = {
  stepZip1: StepZipPage;
  stepZip2: StepZipPage;
  stepInterest1: StepInterestPage;
  stepInterest2: StepInterestPage;
  stepProperty1: StepPropertyPage;
  stepProperty2: StepPropertyPage;
  stepContact1: StepContactPage;
  stepContact2: StepContactPage;
  stepPhone1: StepPhonePage;
  stepPhone2: StepPhonePage;
  stepSorry1: StepSorryPage;
  stepSorry2: StepSorryPage;
  reviewsSection: ReviewsSection;
  thankYouPage: ThankYouPage;
};

export const test = base.extend<PagesFixture>({
  page: async ({ page }, use) => {
    await page.goto("/");
    await use(page);
  },
  stepZip1: async ({ page }, use) => {
    await use(new StepZipPage(page, 0));
  },
  stepZip2: async ({ page }, use) => {
    await use(new StepZipPage(page, 1));
  },
  stepInterest1: async ({ page }, use) => {
    await use(new StepInterestPage(page, 0));
  },
  stepInterest2: async ({ page }, use) => {
    await use(new StepInterestPage(page, 1));
  },
  stepProperty1: async ({ page }, use) => {
    await use(new StepPropertyPage(page, 0));
  },
  stepProperty2: async ({ page }, use) => {
    await use(new StepPropertyPage(page, 1));
  },
  stepContact1: async ({ page }, use) => {
    await use(new StepContactPage(page, 0));
  },
  stepContact2: async ({ page }, use) => {
    await use(new StepContactPage(page, 1));
  },
  stepPhone1: async ({ page }, use) => {
    await use(new StepPhonePage(page, 0));
  },
  stepPhone2: async ({ page }, use) => {
    await use(new StepPhonePage(page, 1));
  },
  stepSorry1: async ({ page }, use) => {
    await use(new StepSorryPage(page, 0));
  },
  stepSorry2: async ({ page }, use) => {
    await use(new StepSorryPage(page, 1));
  },
  reviewsSection: async ({ page }, use) => {
    await use(new ReviewsSection(page));
  },
  thankYouPage: async ({ page }, use) => {
    await use(new ThankYouPage(page));
  },
});

export { expect } from "@playwright/test";
