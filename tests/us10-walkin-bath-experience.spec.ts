import { test, expect } from '../fixtures/pages.fixture';

test.describe('US10: Walk-In Bath User Experience', () => {
    test('TC01: Reviews section is visible on page scroll', async ({ reviewsSection }) => {
        await reviewsSection.scrollToReviews();
        await expect(reviewsSection.isReviewsVisible()).resolves.toBe(true);
    });

    test('TC02: Click "Show more" => hidden review comments become visible', async ({ reviewsSection }) => {
        await reviewsSection.scrollToReviews();
        const isShowMoreVisible = await reviewsSection.isShowMoreVisible();
        expect(isShowMoreVisible).toBe(true);
        await reviewsSection.clickShowMore();
        // After clicking Show more the button text should change or Denny's review stays visible
        await expect(reviewsSection.isDennyReviewVisible()).resolves.toBe(true);
    });

    test("TC03: Click customer's real installation photo in Denny's review => photo opens in zoomed/lightbox overlay (DEF-05)", async ({ reviewsSection }) => {
        test.fail(); // DEF-05: Photo zoom does not work, expected to open lightbox overlay
        await reviewsSection.scrollToReviews();
        // Denny's review is behind "Show more" — must expand it first
        await reviewsSection.clickShowMore();
        await expect(reviewsSection.isDennyReviewVisible()).resolves.toBe(true);
        await reviewsSection.clickDennyReviewPhoto();
        // Expected: lightbox opens. Actual: nothing happens (DEF-05)
        const isZoomVisible = await reviewsSection.isPhotoZoomOverlayVisible();
        expect(isZoomVisible).toBe(true);
    });
});
