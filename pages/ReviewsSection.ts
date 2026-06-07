import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ReviewsSection extends BasePage {
  // Reviews section — the specific section that contains review cards
  private readonly reviewsSection: Locator = this.page
    .locator("section.background-lightBlue")
    .filter({ hasText: "See What People Are Saying" });
  // Section heading text, used to assert the right section rendered
  private readonly sectionHeading: Locator = this.reviewsSection.getByText("See What People Are Saying");
  // Individual review cards within the section
  private readonly reviewCards: Locator = this.reviewsSection.locator(".review");
  // "Show more" is rendered as span.moreless__txt with exact text
  private readonly showMoreButton: Locator = this.page.locator(".moreless__txt").getByText("Show more");
  // Denny's review card is a .review element containing "Denny"
  private readonly dennyReviewCard: Locator = this.page
    .locator(".review")
    .filter({ hasText: /denny/i })
    .first();
  // Review installation photo inside Denny's review card (excludes the avatar)
  private readonly dennyReviewPhotoImage: Locator = this.dennyReviewCard.locator(".review__img img");
  // Lightbox/zoom overlay that should appear on photo click
  private readonly photoZoomOverlay: Locator = this.page.getByRole("dialog");

  constructor(page: Page) {
    super(page);
  }

  async scrollToReviews(): Promise<void> {
    await this.reviewsSection.scrollIntoViewIfNeeded();
  }

  async isReviewsVisible(): Promise<boolean> {
    return this.reviewsSection.isVisible().catch(() => false);
  }

  async getHeadingText(): Promise<string | null> {
    return this.getVisibleText(this.sectionHeading);
  }

  async getReviewCount(): Promise<number> {
    return this.reviewCards.count();
  }

  async clickShowMore(): Promise<void> {
    await this.click(this.showMoreButton);
  }

  async isShowMoreVisible(): Promise<boolean> {
    return this.showMoreButton.isVisible().catch(() => false);
  }

  async isDennyReviewVisible(): Promise<boolean> {
    return this.dennyReviewCard.isVisible().catch(() => false);
  }

  async clickDennyReviewPhoto(): Promise<void> {
    await this.dennyReviewPhotoImage.click();
  }

  async isPhotoZoomOverlayVisible(): Promise<boolean> {
    return this.photoZoomOverlay.isVisible().catch(() => false);
  }
}
