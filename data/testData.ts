export const ZIP = {
  serviceAvailable: '68901',
  outOfArea: '11111',
  tooShort: '1234',
  tooLong: '123456',
  nonNumeric: 'ABCDE',
  zipPlus4: '12345-6789',
} as const;

export const VALID_USER = {
  firstName: 'John',
  lastName: 'Smith',
  fullName: 'John Smith',
  email: 'john.smith@example.com',
  phone: '5551234567',
  phoneFormatted: '(555) 123-4567',
} as const;

export const INTERESTS = {
  independence: 'Independence',
  safety: 'Safety',
  therapy: 'Therapy',
  other: 'Other',
} as const;

export const PROPERTY_TYPES = {
  owned: 'Owned House/Condo',
  rental: 'Rental Property',
  mobile: 'Mobile Home',
} as const;

export const ERROR_MESSAGES = {
  zip: {
    empty: 'Enter your ZIP code.',
    invalid: 'Wrong ZIP code.',
  },
  name: {
    empty: 'Please enter your name.',
    invalidFormat: 'Your full name should contain both first and last name',
  },
  email: {
    empty: 'Enter your email address.',
    invalid: 'Please enter a valid email address.',
  },
  phone: {
    empty: 'Enter your phone number.',
    invalid: 'Wrong phone number.',
  },
  interest: {
    empty: 'Please select at least one option.',
  },
  property: {
    empty: 'Choose one of the variants.',
  },
} as const;

export const CONFIRMATION_MESSAGES = {
  thankYouUrl: '/thankyou',
  thankYouHeading: 'Thank You',
  sorryMessage: 'We are sorry, service is not available in your ZIP code',
  emailConfirmation: 'Thank you for your interest',
} as const;