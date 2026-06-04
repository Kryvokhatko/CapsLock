import { test, expect } from "../fixtures/pages.fixture";
import { ZIP, ERROR_MESSAGES } from "../data/testData";

test.describe("US04: ZIP Code Validation", () => {
  test("TC01: Empty ZIP => required error message", async ({ stepZip1 }) => {
    // Do not fill ZIP, just submit
    await stepZip1.submit();
    // Verify Error message
    const errorText = await stepZip1.getErrorText();
    expect(errorText).toBe(ERROR_MESSAGES.zip.empty);
  });

  test("TC02: 4-digit ZIP => invalid ZIP error (BVA lower boundary)", async ({
    stepZip1,
  }) => {
    // Fill 4-digit ZIP (one less than required)
    await stepZip1.fillZip(ZIP.tooShort);
    await stepZip1.submit();
    // Verify Error message
    const errorText = await stepZip1.getErrorText();
    expect(errorText).toBe(ERROR_MESSAGES.zip.invalid);
  });

  test("TC03: 6-digit ZIP => invalid ZIP error (BVA upper boundary)", async ({
    stepZip1,
  }) => {
    // Fill 6-digit ZIP (one more than required)
    await stepZip1.fillZip(ZIP.tooLong);
    await stepZip1.submit();
    // Verify Error message
    const errorText = await stepZip1.getErrorText();
    expect(errorText).toBe(ERROR_MESSAGES.zip.invalid);
  });

  test("TC04: Non-numeric characters => invalid ZIP error", async ({
    stepZip1,
  }) => {
    // Fill non-numeric ZIP
    await stepZip1.fillZip(ZIP.nonNumeric);
    await stepZip1.submit();
    // Verify Error message
    const errorText = await stepZip1.getErrorText();
    expect(errorText).toBe(ERROR_MESSAGES.zip.invalid);
  });

  test("TC05: ZIP+4 format => invalid ZIP error (DEF-02)", async ({
    stepZip1,
  }) => {
    test.fail(); // DEF-02: ZIP+4 currently passes validation; expected to fail
    // Fill ZIP+4 format (should be rejected but currently passes)
    await stepZip1.fillZip(ZIP.zipPlus4);
    await stepZip1.submit();
    // Verify Error message (expected but currently does not happen)
    const errorText = await stepZip1.getErrorText();
    expect(errorText).toBe(ERROR_MESSAGES.zip.invalid);
  });
});
