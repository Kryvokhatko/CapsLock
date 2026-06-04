# CapsLock Test Automation

Playwright-based end-to-end test automation suite for the CapsLock walk-in tub quote form. Tests are organized by user scenarios and cover happy paths, alternative flows, validation rules, and known defects.

## Setup & Installation

### Prerequisites

- **Node.js** 18+ and npm 8+
- Windows, macOS, or Linux

### Install Dependencies

```bash
npm install
```

### Install Browsers

```bash
npx playwright install
```

To install only Chromium (faster):

```bash
npx playwright install chromium
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Specific Test File

```bash
npx playwright test tests/us01-form1-happy-path.spec.ts
```

### Run Specific Test

```bash
npx playwright test -g "TC01"
```

### Run with Debug Mode

```bash
npm run test:debug
```

### View HTML Report

```bash
npm run report
```

### Lint (formatting) & Type Check

```bash
npm run lint        # prettier --check .
npm run typecheck   # tsc --noEmit
```

## Project Structure

```
capslock/
├── package.json
├── tsconfig.json                 # TypeScript config (used by `npm run typecheck`)
├── playwright.config.ts          # Playwright configuration
├── .prettierignore               # Paths excluded from formatting checks
├── .github/workflows/playwright.yml  # CI: install, run tests, upload report
├── data/
│   └── testData.ts               # Centralized test data and constants
├── pages/
│   ├── StepZipPage.ts            # Step 1: ZIP code entry
│   ├── StepInterestPage.ts       # Step 2: Interest selection
│   ├── StepPropertyPage.ts       # Step 3: Property type selection
│   ├── StepContactPage.ts        # Step 4: Contact information
│   ├── StepPhonePage.ts          # Step 5: Phone number entry
│   ├── StepSorryPage.ts          # Out-of-area sorry screen
│   ├── ReviewsSection.ts         # Reviews and testimonials section
│   └── ThankYouPage.ts           # Thank you page (post-submission)
├── fixtures/
│   └── pages.fixture.ts          # Custom Playwright fixtures for POs
└── tests/
    ├── us01-form1-happy-path.spec.ts
    ├── us02-form2-happy-path.spec.ts
    ├── us03-out-of-area-flow.spec.ts
    ├── us04-zip-validation.spec.ts
    ├── us07-contact-info-validation.spec.ts
    └── us10-walkin-bath-experience.spec.ts
```

## Test Scenarios (high level description)

### Full User Scenario Inventory

| #        | Scenario                                                                     | Category       | Automated       |
| -------- | ---------------------------------------------------------------------------- | -------------- | --------------- |
| **US01** | Form #1: Complete 5-step form with service-available ZIP => /thankyou        | Happy Path     | ✅ Yes          |
| **US02** | Form #2: Complete 5-step form with service-available ZIP => /thankyou        | Happy Path     | ✅ Yes          |
| **US03** | Out-of-area ZIP => sorry message => email opt-in => confirmation             | Alternate Path | ✅ Yes          |
| **US04** | ZIP code validation (empty, too short, too long, non-numeric, ZIP+4)         | Validation     | ✅ Yes          |
| **US05** | Step 2 — Advance with no checkbox selected => required error (DEF-01)        | Validation     | ⭕ Defect       |
| **US06** | Step 3 — Advance with no radio selected => required error                    | Validation     | ⭕ Not Selected |
| **US07** | Step 4 — Contact info validation (name required, email HTML5 native)         | Validation     | ✅ Yes          |
| **US08** | Step 5 — Phone number validation (empty, digit count, non-numeric)           | Validation     | ⭕ Not Selected |
| **US09** | Out-of-area opt-in email — HTML5 native validation (separate from US03)      | Validation     | ⭕ Not Selected |
| **US10** | Walk-In Bath user experience: reviews, Show more button, photo zoom          | UX / Bugs      | ✅ Yes          |
| **US11** | Phone field: country code prefix starting with "1" — behavior / possible bug | Edge Case      | ⭕ Not Selected |
| **US12** | Progress indicator shows correct "N of 5" at each step                       | UI State       | ⭕ Not Selected |

### Selected Top 5 Test Scenarios (+ 1 Bonus)

The assignment asks for **at least 5** end-to-end tests, each covering one complete user scenario.
US01–US04 and US07 are the **selected top 5**; **US10 is included as a bonus** because the defect
found there (DEF-05) makes it high-value. The progress-counter behavior (DEF-08) is **not**
automated — it is documented in the Discovered Defects section only.

#### 1. **US01: Form #1 Happy Path** ✅

- **Rationale:** Highest priority. Validates the entire business conversion funnel for the primary form. A break here = zero conversions.
- **Test Cases:**
  - TC01: Complete all 5 steps with valid data => /thankyou
  - TC02: Each step shows its own question heading, advancing through all 5 steps

#### 2. **US02: Form #2 Happy Path** ✅

- **Rationale:** Both form copies carry equal customer value. HTML5 email validation operates on separate DOM instances. Form parity must be verified independently.
- **Test Cases:**
  - TC01: Complete all 5 steps via Form #2 (second copy) => /thankyou
  - TC02: Advancing Form #2 keeps Form #1 synchronized to the same step (shared form state)

#### 3. **US03: Out-of-Area ZIP Flow** ✅

- **Rationale:** Critical alternate path testing ZIP availability API integration. Large share of real users will land here.
- **Test Cases:**
  - TC01: Enter out-of-area ZIP (11111) => sorry message shown
  - TC02: Enter out-of-area ZIP and submit valid email in opt-in field => confirmation message displayed

#### 4. **US04: ZIP Code Validation** ✅

- **Rationale:** ZIP is the entry gate to the entire funnel. Invalid data must be blocked at the first interaction point before any API call is made.
- **Test Cases:**
  - TC01: Empty ZIP => required error
  - TC02: 4-digit ZIP => invalid error (BVA lower boundary)
  - TC03: 6-digit ZIP (service-available ZIP + 1 extra digit) => invalid error (BVA upper boundary)
  - TC04: Non-numeric characters => invalid error
  - TC05: Unavailable service ZIP+4 format => invalid error **(DEF-02 — test.fail())**

#### 5. **US07: Contact Info Validation (Step 4)** ✅

- **Rationale:** Step 4 is the lead capture step. Name and email are core business data. HTML5 native email validation must work per spec.
- **Test Cases:**
  - TC01: Empty name => required error
  - TC02: Single-word name => first and last name error
  - TC03: Empty email => native HTML5 required validation blocks submission
  - TC04: Invalid email format => native HTML5 type validation blocks submission

#### Bonus. **US10: Walk-In Bath User Experience** ✅

- **Rationale:** Users make purchase decisions based on social proof (reviews, photos). The bug discovered here (DEF-05) makes this high-value. Included as a bonus beyond the required 5.
- **Test Cases:**
  - TC01: Reviews section is visible on scroll, with heading text and at least one review card
  - TC02: Click "Show more" => hidden review comments become visible
  - TC03: Click customer's photo in Denny's review => photo zoom **(DEF-05 — test.fail())**

---

## Discovered Defects (high level description)

### DEF-01: Step 2 No Required Validation

- **Location:** Step 2 — Interest checkboxes
- **When Found:** Step 2, click "Next" with zero checkboxes checked
- **Current Behavior:** Form silently advances to Step 3
- **Expected Behavior:** Required validation error shown; stays on Step 2
- **Requirement Violated:** "At least one should be selected"
- **Severity:** High (allows invalid submission)
- **Status:** Documented in US05, not included in the selected automated tests

### DEF-02: ZIP Accepts ZIP+4 Format

- **Location:** Step 1 — ZIP input
- **When Found:** Step 1, enter unavailable service ZIP+4 format "12345-6789" (9 chars)
- **Current Behavior:** Validation passes; proceeds to next step
- **Expected Behavior:** "Sorry, unfortunately we ..." — only exactly 5 digits accepted
- **Requirement Violated:** "Zip code: must consist of exactly 5 digits"
- **Severity:** Medium (edge case data issue)
- **Status:** **Automated as TC05 in US04 with `test.fail()` annotation**

### DEF-03: JS field verification instead of required browser-native HTML5 email validation

- **Location:** Unavailable service ZIP, Step 2
- **When Found:** Step 2 enter part "example" of email (example@gmail.com)
- **Current Behavior:** JS field verification, error message "Wrong email."
- **Expected Behavior:** Browser-native validation (HTML5) works, message "Please include an '@' in the email address, 'example' is missing an '@' "
- **Requirement Violated:** HTML5 best practices and WCAG compliance
- **Severity:** Medium (accessibility issue)
- **Status:** Documented, not automated

### DEF-04: Name Field Label Doesn't Hint First + Last Name Required

- **Location:** Step 4 — Name field label
- **When Found:** Step 4, enter single-word name "John"
- **Current Behavior:** Error: "Your full name should contain both first and last name" but no label/placeholder hints at this
- **Expected Behavior:** Label or placeholder must communicate that first + last name is required
- **Requirement Violated:** UX clarity
- **Severity:** Low (error message is clear, but label should hint)
- **Status:** Documented, not automated

### DEF-05: Real installation photo in Denny's Review Doesn't Zoom (fullscreen preview overlay)

- **Location:** Reviews (Walk-In Bath Experience) section — customer's photo of real installation in Denny's review
- **When Found:** Reviews section, click the real installation photo inside Denny's review card
- **Current Behavior:** Nothing happens; no zoom or fullscreen preview overlay opens
- **Expected Behavior:** Real installation photo opens in an enlarged/fullscreen preview overlay
- **Requirement Violated:** Expected UX for review photos
- **Severity:** Low (cosmetic/UX issue, not blocking core flow)
- **Status:** **Automated as TC03 in US10 with `test.fail()` annotation**

### DEF-06: Phone Input — Country Code Prefix "1" (Needs Investigation)

- **Location:** Step 5 — Phone input
- **When Found:** Step 5, attempt to enter "1" as first digit or full 11-digit number with country code
- **Current Behavior:** Reportedly impossible to enter a phone number with country code prefix starting with "1"
- **Expected Behavior:** If US-only numbers are expected, form should display a clear note; if country codes are supported, 11-digit input starting with 1 should be accepted
- **Severity:** Unknown (pending investigation)
- **Status:** Flagged in US11, not automated pending clarification

### DEF-07: No Way Back from Out-of-Area Screen (Needs Investigation)

- **Location:** Sorry/out-of-area screen
- **When Found:** After landing on the sorry screen (out-of-area ZIP), user attempts to go back and try a different ZIP
- **Current Behavior:** No back button exists on the sorry screen; browser back navigation does not work
- **Expected Behavior:** User should be able to return to Step 1 to try a different ZIP code
- **Severity:** Medium (poor UX for out-of-area users)
- **Status:** Discovered during planning, not automated pending solution design

### DEF-08: No change of counter when switch from Interest (counter 2 of 5) to Type of property (counter 2 of 5)

- **Location:** Step from Interest (counter 2 of 5) to Type of property (counter 2 of 5)
- **When Found:** Available service ZIP => Interest (counter 2 of 5) => Type of property (counter 2 of 5)
- **Current Behavior:** No change of counter when switch from Interest (counter 2 of 5) to Type of property (counter 2 of 5)
- **Expected Behavior:** Counter should increment Interest (counter 2 of 5) => Type of property (counter 3 of 5)
- **Severity:** Medium (poor UX issue, not blocking core flow)
- **Status:** Documented only (not automated); reported as a defect rather than a passing/`test.fail()` test

---

## Test Design Principles

### Page Object Model (POM)

- One class per form step/section
- Methods return data or expose state, not make assertions
- Locators use semantic selectors (role, label, placeholder) over CSS classes
- Form index parameter (0 = Form #1, 1 = Form #2) allows targeting both form copies

### Test Structure

- One `test.describe()` per User Scenario
- Multiple `test()` blocks per describe, each testing a specific Test Case
- Centralized test data in `testData.ts` — no magic strings
- Assertions only in spec files, not in PO classes
- `test.fail()` used to document known defects while tests pass CI

### Locator Strategy

| Element           | Selector                                | Why                                                  |
| ----------------- | --------------------------------------- | ---------------------------------------------------- |
| ZIP input         | `getByPlaceholder('Enter ZIP Code')`    | Unique, semantic                                     |
| Next button       | `getByRole('button', { name: 'Next' })` | Accessible name                                      |
| Checkboxes/radios | `locator('label').filter({ hasText })`  | Inputs are CSS-hidden; users click the visible label |
| Error message     | `locator('.helpBlock')`                 | Stable CSS class for inline validation text          |
| Email validity    | `validity` via `input.evaluate(...)`    | Asserts native HTML5 constraint validation           |
| Form container    | `locator('.steps.step-N').nth(index)`   | Scopes to one form copy                              |

### Waiting Strategy

- Rely on Playwright's built-in auto-waiting for locators
- Only one explicit wait: after ZIP submit, wait for `.step-anim` animation to complete
- Reason: ZIP check is async; no aria-busy or other state change to auto-wait on

---

## CI/CD Integration

Tests run automatically on every push and pull request to `main`/`master` via GitHub Actions —
see [.github/workflows/playwright.yml](.github/workflows/playwright.yml). The workflow installs
dependencies with `npm ci`, installs browsers with `npx playwright install --with-deps`, runs the
full suite, and uploads the HTML report as an artifact.

---

## Framework Improvement Ideas

### 1. **Agent-Driven Workflow via the Playwright CLI/MCP tooling**

- **Why:** Manual locator maintenance and debugging are the biggest time sinks as a suite grows.
- **How:** Adopt Playwright's CLI and MCP tooling so coding agents can drive the browser directly — inspecting live DOM, planning new tests, and auto-healing broken locators against the running page.
- **Benefit:** Faster authoring, richer debugging, and self-healing tests that survive routine UI changes.

### 2. **Richer Reporting & Trends**

- **Why:** A single HTML report shows only the latest run; flaky and slowly-degrading tests stay invisible.
- **How:** Add trend reporting (e.g. Allure or a dashboard), retain CI artifacts/traces per run, and track flake rate and duration over time.
- **Benefit:** Faster triage, early detection of flakiness, and visibility into suite health across runs.

### 3. **API Mocking for Deterministic ZIP Flows**

- **Why:** ZIP availability hits a live backend; network flakiness and data changes cause non-deterministic failures.
- **How:** Mock the ZIP-check endpoint with Playwright's `route()` to serve fixed service-available / out-of-area responses.
- **Benefit:** Faster, reproducible, CI-friendly tests that don't depend on backend availability.

### 4. **Accessibility (a11y) Automated Testing**

- **Why:** WCAG compliance widens reach, and DEF-03 shows accessibility gaps already exist.
- **How:** Integrate `@axe-core/playwright` to run automated a11y audits on each step.
- **Benefit:** Catch missing alt text, color-contrast, and ARIA issues in CI before release.

---

## Troubleshooting

### Tests Fail with "Executable doesn't exist"

Run `npx playwright install` to download browsers.

### Timeout Errors

Increase `timeout` in `playwright.config.ts` if network is slow. Default is 30 seconds.

### Locator Not Found

Check the website for DOM changes. Update locators in the relevant PO class. Use `npx playwright codegen` to inspect live selectors.

### test.fail() Tests Passing Unexpectedly

If DEF-05 or DEF-02 are fixed in production, remove `test.fail()` annotation.

---

## Contact & Support

- **Test Framework Owner:** Serhii Kryvokhatko
- **GitHub:** https://github.com/Kryvokhatko/CapsLock
- **Test App:** https://test-qa.capslock.global
