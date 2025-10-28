# Stripe Payment Integration - Testing Checklist

## Pre-Testing Setup

### 1. Environment Variables

-   [ ] Create/Update `.env` file in project root
-   [ ] Add: `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here`
-   [ ] Verify the key starts with `pk_test_` (for test mode)
-   [ ] Restart development server after adding/updating `.env`

### 2. Backend Verification

-   [ ] Confirm backend server is running
-   [ ] Verify endpoint exists: `PUT /api/orders/:id/pay`
-   [ ] Test endpoint accepts payment result object
-   [ ] Verify endpoint updates order status correctly

### 3. Development Server

-   [ ] Run `npm install` (if needed)
-   [ ] Run `npm run dev`
-   [ ] Verify no console errors on startup
-   [ ] Check that app loads correctly

---

## Functional Testing

### Test 1: Successful Payment Flow ✅

**Steps:**

1. [ ] Add items to cart
2. [ ] Proceed through checkout (shipping, payment method)
3. [ ] Click "Place Order"
4. [ ] Verify order is created and you're on OrderPage
5. [ ] Click "CheckOut" button
6. [ ] Verify Checkout page loads with Stripe form
7. [ ] Fill in card details:
    - Card Number: `4242 4242 4242 4242`
    - Expiry: `12/34` (any future date)
    - CVC: `123`
    - Name: `Test User`
8. [ ] Click "Pay Now"
9. [ ] Verify "Processing..." message appears
10. [ ] Verify success toast appears: "Payment successful!"
11. [ ] Verify redirect to order page after ~1.5 seconds
12. [ ] Verify order shows as paid

**Expected Result:** ✅ Payment succeeds, order updates, user redirected

---

### Test 2: Declined Card ❌

**Steps:**

1. [ ] Follow steps 1-6 from Test 1
2. [ ] Fill in card details:
    - Card Number: `4000 0000 0000 0002`
    - Expiry: `12/34`
    - CVC: `123`
    - Name: `Test User`
3. [ ] Click "Pay Now"
4. [ ] Verify error message appears
5. [ ] Verify user stays on checkout page
6. [ ] Verify order is NOT marked as paid

**Expected Result:** ❌ Payment fails with error message

---

### Test 3: Insufficient Funds ❌

**Steps:**

1. [ ] Follow steps 1-6 from Test 1
2. [ ] Fill in card details:
    - Card Number: `4000 0000 0000 9995`
    - Expiry: `12/34`
    - CVC: `123`
    - Name: `Test User`
3. [ ] Click "Pay Now"
4. [ ] Verify error message appears
5. [ ] Verify user stays on checkout page

**Expected Result:** ❌ Payment fails with insufficient funds error

---

### Test 4: Invalid Card Number ❌

**Steps:**

1. [ ] Follow steps 1-6 from Test 1
2. [ ] Fill in card details:
    - Card Number: `4242 4242 4242 4241` (invalid)
    - Expiry: `12/34`
    - CVC: `123`
    - Name: `Test User`
3. [ ] Click "Pay Now"
4. [ ] Verify validation error appears

**Expected Result:** ❌ Validation error before submission

---

### Test 5: Expired Card ❌

**Steps:**

1. [ ] Follow steps 1-6 from Test 1
2. [ ] Fill in card details:
    - Card Number: `4242 4242 4242 4242`
    - Expiry: `12/20` (past date)
    - CVC: `123`
    - Name: `Test User`
3. [ ] Verify expiry field shows error
4. [ ] Try to submit
5. [ ] Verify error message

**Expected Result:** ❌ Validation error for expired card

---

### Test 6: Empty Fields Validation ❌

**Steps:**

1. [ ] Follow steps 1-6 from Test 1
2. [ ] Leave all fields empty
3. [ ] Click "Pay Now"
4. [ ] Verify validation errors appear for:
    - [ ] Cardholder name
    - [ ] Card number
    - [ ] Expiry
    - [ ] CVC

**Expected Result:** ❌ Validation errors for all required fields

---

### Test 7: Incomplete Card Number ❌

**Steps:**

1. [ ] Follow steps 1-6 from Test 1
2. [ ] Enter partial card number: `4242 4242`
3. [ ] Try to submit
4. [ ] Verify error message

**Expected Result:** ❌ Validation error for incomplete card

---

### Test 8: Invalid CVC ❌

**Steps:**

1. [ ] Follow steps 1-6 from Test 1
2. [ ] Fill in card details:
    - Card Number: `4242 4242 4242 4242`
    - Expiry: `12/34`
    - CVC: `12` (too short)
    - Name: `Test User`
3. [ ] Verify CVC field shows error

**Expected Result:** ❌ Validation error for invalid CVC

---

## Browser Console Testing

### During Payment Flow:

-   [ ] Open browser DevTools (F12)
-   [ ] Go to Console tab
-   [ ] Perform successful payment
-   [ ] Verify no errors in console
-   [ ] Check for expected logs:
    -   [ ] Payment intent data logged
    -   [ ] "Payment made!" or similar success message

### Network Tab:

-   [ ] Open Network tab in DevTools
-   [ ] Perform payment
-   [ ] Verify API calls:
    -   [ ] `POST /api/payments/create-payment` - Status 200
    -   [ ] `PUT /api/orders/:id/pay` - Status 200
-   [ ] Check request/response payloads

---

## Edge Cases Testing

### Test 9: Multiple Payment Attempts

**Steps:**

1. [ ] Start payment with declined card
2. [ ] Verify error message
3. [ ] Try again with valid card
4. [ ] Verify payment succeeds

**Expected Result:** ✅ Second attempt succeeds

---

### Test 10: Browser Back Button

**Steps:**

1. [ ] Start payment process
2. [ ] Click browser back button
3. [ ] Verify no errors
4. [ ] Try to proceed again

**Expected Result:** ✅ No errors, can retry

---

### Test 11: Page Refresh During Payment

**Steps:**

1. [ ] Start entering card details
2. [ ] Refresh page (F5)
3. [ ] Verify form reloads correctly
4. [ ] Complete payment

**Expected Result:** ✅ Form reloads, payment works

---

### Test 12: Slow Network

**Steps:**

1. [ ] Open DevTools → Network tab
2. [ ] Set throttling to "Slow 3G"
3. [ ] Perform payment
4. [ ] Verify loading states appear
5. [ ] Verify payment completes

**Expected Result:** ✅ Loading indicators show, payment succeeds

---

## Mobile Testing (Optional)

### Responsive Design:

-   [ ] Test on mobile viewport (DevTools)
-   [ ] Verify form is usable
-   [ ] Verify buttons are clickable
-   [ ] Verify text is readable

---

## Security Testing

### Client-Side:

-   [ ] Verify card details are not logged to console
-   [ ] Verify card details are not stored in localStorage
-   [ ] Verify Stripe Elements are used (not plain inputs)
-   [ ] Verify HTTPS is used (in production)

---

## Performance Testing

### Load Times:

-   [ ] Measure time to load Checkout page
-   [ ] Measure time to process payment
-   [ ] Verify no memory leaks (DevTools → Memory)

---

## Accessibility Testing

### Keyboard Navigation:

-   [ ] Tab through form fields
-   [ ] Verify all fields are reachable
-   [ ] Verify form can be submitted with Enter key

### Screen Reader (Optional):

-   [ ] Test with screen reader
-   [ ] Verify labels are read correctly
-   [ ] Verify error messages are announced

---

## Integration Testing

### Full E2E Flow:

-   [ ] Create new user account
-   [ ] Add items to cart
-   [ ] Complete shipping information
-   [ ] Select payment method
-   [ ] Place order
-   [ ] Complete payment
-   [ ] Verify order in order history
-   [ ] Verify email confirmation (if implemented)

---

## Stripe Dashboard Verification

### After Successful Payment:

1. [ ] Log into Stripe Dashboard (test mode)
2. [ ] Go to Payments section
3. [ ] Verify payment appears
4. [ ] Check payment details match
5. [ ] Verify amount is correct
6. [ ] Verify metadata includes orderId

---

## Common Issues & Solutions

### Issue: "Stripe is not defined"

**Solution:**

-   Check `.env` file has `VITE_STRIPE_PUBLISHABLE_KEY`
-   Restart dev server
-   Clear browser cache

### Issue: "clientSecret is undefined"

**Solution:**

-   Check backend is running
-   Verify `/payments/create-payment` endpoint works
-   Check network tab for errors

### Issue: "Payment succeeds but order not updated"

**Solution:**

-   Check backend `/orders/:id/pay` endpoint
-   Verify endpoint accepts payment result
-   Check backend logs for errors

### Issue: Form not loading

**Solution:**

-   Check console for errors
-   Verify Stripe key is correct
-   Check network connectivity

---

## Test Results Summary

### Date: ******\_\_\_******

### Tester: ******\_\_\_******

| Test Case                  | Status          | Notes |
| -------------------------- | --------------- | ----- |
| Test 1: Successful Payment | ⬜ Pass ⬜ Fail |       |
| Test 2: Declined Card      | ⬜ Pass ⬜ Fail |       |
| Test 3: Insufficient Funds | ⬜ Pass ⬜ Fail |       |
| Test 4: Invalid Card       | ⬜ Pass ⬜ Fail |       |
| Test 5: Expired Card       | ⬜ Pass ⬜ Fail |       |
| Test 6: Empty Fields       | ⬜ Pass ⬜ Fail |       |
| Test 7: Incomplete Card    | ⬜ Pass ⬜ Fail |       |
| Test 8: Invalid CVC        | ⬜ Pass ⬜ Fail |       |
| Test 9: Multiple Attempts  | ⬜ Pass ⬜ Fail |       |
| Test 10: Back Button       | ⬜ Pass ⬜ Fail |       |
| Test 11: Page Refresh      | ⬜ Pass ⬜ Fail |       |
| Test 12: Slow Network      | ⬜ Pass ⬜ Fail |       |

### Overall Status: ⬜ All Tests Passed ⬜ Some Tests Failed

### Notes:

---

---

---

---

## Sign-Off

-   [ ] All critical tests passed
-   [ ] No console errors
-   [ ] Backend integration verified
-   [ ] Ready for staging deployment

**Tested By:** ******\_\_\_******
**Date:** ******\_\_\_******
**Signature:** ******\_\_\_******
