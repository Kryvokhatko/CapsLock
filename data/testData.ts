export const ZIP = {
  serviceAvailable: "68901",
  outOfArea: "11111",
  tooShort: "1234",
  tooLong: "689011",
  nonNumeric: "ABCDE",
  zipPlus4: "12345-6789",
} as const;

export const VALID_USER = {
  firstName: "John",
  fullName: "John Smith",
  email: "john.smith@example.com",
  phone: "5551234567",
} as const;

export const INTERESTS = {
  independence: "Independence",
  safety: "Safety",
  therapy: "Therapy",
} as const;

export const PROPERTY_TYPES = {
  owned: "Owned House/Condo",
  rental: "Rental Property",
  mobile: "Mobile Home",
} as const;

export const ERROR_MESSAGES = {
  zip: {
    empty: "Enter your ZIP code.",
    invalid: "Wrong ZIP code.",
  },
  name: {
    empty: "Please enter your name.",
  },
} as const;

export const CONFIRMATION_MESSAGES = {
  thankYouUrl: "/thankyou",
} as const;
