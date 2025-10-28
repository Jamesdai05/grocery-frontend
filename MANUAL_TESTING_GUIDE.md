# Stripe Payment Integration - Manual Testing Guide

## Pre-Testing Setup ✅

### 1. Verify Development Server

-   ✅ Vite server is running (confirmed: process 11539)
-   URL: http://localhost:5173

### 2. Environment Variables

Before testing, ensure `.env` file exists with:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

**To verify:**

```bash
cat .env | grep VITE_STRIPE_PUBLISHABLE_KEY
```

If missing, create `.env` file using `.env.example` as template.

---

## Testing Procedure

### Test 1: Successful Payment Flow ✅

**Steps:**

1. Open browser: http://localhost:5173
2. Login to your account (if required)
3. Add items to cart
4. Navigate through checkout:
    - Cart → Shipping Info → Payment Method → Place Order
5. On Order Page, click "CheckOut" button
6. Verify Checkout page loads with Stripe form
7. Fill in payment details:
    - **Name on Card:** Test User
    - **Card Number:** 4242 4242 4242 4242
    - **Expiry:** 12/34
    - **CVC:** 123
8. Click "Pay Now"
9. Wait for processing

**Expected Results:**

-   ✅ "Processing..." button text appears
-   ✅ Success toast: "Payment successful!"
-   ✅ Redirect to order page after 1.5 seconds
-   ✅ Order shows as paid
-   ✅ No console errors

**What to Check:**

-   [ ] Payment intent created successfully
-   [ ] Stripe form loaded without errors
-   [ ] Card validation worked
-   [ ] Payment processed
-   [ ] Backend order updated (check network tab)
-   [ ] User redirected correctly
-   [ ] Toast notification appeared

---

### Test 2: Declined Card ❌

**Steps:**

1. Follow steps 1-6 from Test 1
2. Fill in payment details:
    - **Card Number:** 4000 0000 0000 0002 (declined card)
    - **Expiry:** 12/34
    - **CVC:** 123
    - **Name:** Test User
3. Click "Pay Now"

**Expected Results:**

-   ❌ Error toast appears with decline message
-   ❌ User stays on checkout page
-   ❌ Order NOT marked as paid
-   ✅ Form remains functional for retry

---

### Test 3: Form Validation ⚠️

**Test 3a: Empty Fields**

1. Navigate to checkout page
2. Leave all fields empty
3. Click "Pay Now"

**Expected:**

-   ❌ "Cardholder name is required" error
-   ❌ Card fields show validation errors
-   ❌ Form does not submit

**Test 3b: Invalid Card Number**

1. Enter card: 4242 4242 4242 4241 (invalid)
2. Try to submit

**Expected:**

-   ❌ Card validation error appears

**Test 3c: Expired Card**

1. Enter card: 4242 4242 4242 4242
2. Enter expiry: 12/20 (past date)

**Expected:**

-   ❌ Expiry validation error

---

### Test 4: Network Verification 🌐

**Using Browser DevTools:**

1. Open DevTools (F12)
2. Go to Network tab
3. Perform successful payment
4. Verify these API calls:

**Call 1: Create Payment Intent**

-   URL: `POST /api/payments/create-payment`
-   Status: 200
-   Response should include: `{ clientSecret: "pi_..." }`

**Call 2: Update Order**

-   URL: `PUT /api/orders/{orderId}/pay`
-   Status: 200
-   Request body should include:
    ```json
    {
        "id": "pi_...",
        "status": "succeeded",
        "update_time": "...",
        "email_address": "..."
    }
    ```

---

### Test 5: Console Verification 🔍

**During Payment Flow:**

1. Open Console tab in DevTools
2. Perform payment
3. Check for:
    - ✅ No errors (red messages)
    - ✅ Payment intent data logged
    - ✅ Success messages

**Common Issues to Look For:**

-   ❌ "Stripe is not defined" → Check env variable
-   ❌ "clientSecret is undefined" → Check backend
-   ❌ "Cannot read property 'id'" → Check props passing
-   ❌ CORS errors → Check backend configuration

---

## Code Verification Checklist

### ✅ Files Modified Correctly:

**1. src/apiCall/dataFetch.js**

```javascript
// Should have this function:
export const updateOrderToPaid = async (orderId, paymentResult) => {
    const response = await apiClient.put(
        `/orders/${orderId}/pay`,
        paymentResult
    );
    return response.data;
};
```

**2. src/pages/Checkout.jsx**

```javascript
// Should pass props:
<StripeCheckoutForm clientSecret={clientSecret} orderId={orderId} />
```

**3. src/components/StripeCheckOutForm.jsx**

-   ✅ Imports `updateOrderToPaid`
-   ✅ Receives `clientSecret` and `orderId` props
-   ✅ `confirmCardPayment` only uses `payment_method.id`
-   ✅ Success handler updates order and redirects
-   ✅ Error handling implemented

**4. src/App.jsx**

-   ✅ Removed unused Stripe imports
-   ✅ No `stripePromise` variable

**5. src/hooks/useOrder.js**

-   ✅ Has `useUpdateOrderToPaid` hook

**6. src/pages/StripePaymentPage.jsx**

-   ✅ File deleted

---

## Backend Verification

### Required Endpoints:

**1. Create Payment Intent**

```
POST /api/payments/create-payment
Body: { amount: number, orderId: string }
Response: { clientSecret: string }
```

**2. Update Order Payment**

```
PUT /api/orders/:id/pay
Body: { id, status, update_time, email_address }
Response: { updated order object }
```

**To Test Backend:**

```bash
# Test payment intent creation
curl -X POST http://localhost:YOUR_BACKEND_PORT/api/payments/create-payment \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000, "orderId": "test123"}'

# Should return: {"clientSecret": "pi_..."}
```

---

## Stripe Test Cards

Use these for testing different scenarios:

| Scenario           | Card Number         | Expected Result    |
| ------------------ | ------------------- | ------------------ |
| Success            | 4242 4242 4242 4242 | Payment succeeds   |
| Decline            | 4000 0000 0000 0002 | Card declined      |
| Insufficient Funds | 4000 0000 0000 9995 | Insufficient funds |
| Expired            | 4000 0000 0000 0069 | Expired card       |
| Processing Error   | 4000 0000 0000 0119 | Processing error   |

**For all cards:**

-   Expiry: Any future date (e.g., 12/34)
-   CVC: Any 3 digits (e.g., 123)

---

## Troubleshooting

### Issue: Stripe form doesn't load

**Check:**

1. `.env` has `VITE_STRIPE_PUBLISHABLE_KEY`
2. Dev server restarted after adding env variable
3. Console for errors
4. Network tab for failed requests

### Issue: Payment succeeds but order not updated

**Check:**

1. Backend `/orders/:id/pay` endpoint exists
2. Network tab shows 200 response
3. Backend logs for errors
4. Order object in database

### Issue: "clientSecret is undefined"

**Check:**

1. Backend `/payments/create-payment` returns clientSecret
2. Network tab shows successful response
3. Props passed correctly to StripeCheckoutForm

### Issue: Console errors about props

**Check:**

1. Checkout.jsx passes `clientSecret` and `orderId`
2. StripeCheckoutForm receives props correctly
3. No typos in prop names

---

## Test Results Template

### Test Session: [Date/Time]

### Tester: [Your Name]

| Test                | Status          | Notes |
| ------------------- | --------------- | ----- |
| Successful Payment  | ⬜ Pass ⬜ Fail |       |
| Declined Card       | ⬜ Pass ⬜ Fail |       |
| Form Validation     | ⬜ Pass ⬜ Fail |       |
| Network Calls       | ⬜ Pass ⬜ Fail |       |
| Console Errors      | ⬜ Pass ⬜ Fail |       |
| Order Update        | ⬜ Pass ⬜ Fail |       |
| User Redirect       | ⬜ Pass ⬜ Fail |       |
| Toast Notifications | ⬜ Pass ⬜ Fail |       |

### Issues Found:

1. ***
2. ***
3. ***

### Overall Status: ⬜ Ready for Production ⬜ Needs Fixes

---

## Next Steps After Testing

### If All Tests Pass ✅

1. Commit changes to git
2. Create pull request
3. Deploy to staging
4. Perform UAT (User Acceptance Testing)
5. Deploy to production

### If Tests Fail ❌

1. Document issues found
2. Review error messages
3. Check backend logs
4. Fix issues
5. Re-test

---

## Quick Start Testing

**Fastest way to test:**

1. Ensure backend is running
2. Ensure `.env` has Stripe key
3. Open: http://localhost:5173
4. Login and add items to cart
5. Complete checkout flow
6. Use card: 4242 4242 4242 4242
7. Verify payment succeeds and order updates

**Expected time:** 3-5 minutes

---

## Support

If you encounter issues:

1. Check STRIPE_INTEGRATION_ANALYSIS.md for known issues
2. Review STRIPE_FIXES_SUMMARY.md for implementation details
3. Use TESTING_CHECKLIST.md for comprehensive testing
4. Check browser console and network tab
5. Review backend logs

---

## Summary

All code changes have been implemented correctly. The Stripe payment integration should now:

-   ✅ Create payment intents properly
-   ✅ Handle card validation
-   ✅ Process payments successfully
-   ✅ Update order status after payment
-   ✅ Show user feedback (toasts)
-   ✅ Redirect users appropriately
-   ✅ Handle errors gracefully

**Status: Ready for Manual Testing**
