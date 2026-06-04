import { Page, Locator } from "@playwright/test";

export class ReviewsSection {
  readonly page: Page;

  private readonly reviewsSection: Locator;
  private readonly sectionHeading: Locator;
  private readonly reviewCards: Locator;
  private readonly showMoreButton: Locator;
  private readonly dennyReviewCard: Locator;
  private readonly dennyReviewPhotoImage: Locator;
  private readonly photoZoomOverlay: Locator;

  constructor(page: Page) {
    this.page = page;

    // Reviews section — the specific section that contains review cards
    this.reviewsSection = page
      .locator("section.background-lightBlue")
      .filter({ hasText: "See What People Are Saying" });
    // Section heading text, used to assert the right section rendered
    this.sectionHeading = this.reviewsSection.getByText(
      "See What People Are Saying",
    );
    // Individual review cards within the section
    this.reviewCards = this.reviewsSection.locator(".review");
    // "Show more" is rendered as span.moreless__txt with exact text
    this.showMoreButton = page.locator(".moreless__txt").getByText("Show more");
    // Denny's review card is a .review element containing "Denny"
    this.dennyReviewCard = page
      .locator(".review")
      .filter({ hasText: /denny/i })
      .first();
    // Review installation photo inside Denny's review card (excludes the avatar)
    this.dennyReviewPhotoImage =
      this.dennyReviewCard.locator(".review__img img");
    // Lightbox/zoom overlay that should appear on photo click
    this.photoZoomOverlay = page.getByRole("dialog");
  }

  async scrollToReviews(): Promise<void> {
    await this.reviewsSection.scrollIntoViewIfNeeded();
  }

  async isReviewsVisible(): Promise<boolean> {
    return this.reviewsSection.isVisible().catch(() => false);
  }

  async getHeadingText(): Promise<string | null> {
    const isVisible = await this.sectionHeading.isVisible().catch(() => false);
    return isVisible
      ? ((await this.sectionHeading.textContent())?.trim() ?? null)
      : null;
  }

  async getReviewCount(): Promise<number> {
    return this.reviewCards.count();
  }

  async clickShowMore(): Promise<void> {
    await this.showMoreButton.click();
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
