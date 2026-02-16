# GlowReaJo Admin Panel Guide

A complete guide to managing the GlowReaJo online store through the Medusa admin dashboard.

---

## Table of Contents

1. [Logging In](#1-logging-in)
2. [Dashboard Overview](#2-dashboard-overview)
3. [Managing Products](#3-managing-products)
4. [Managing Categories](#4-managing-categories)
5. [Managing Orders](#5-managing-orders)
6. [Managing Promotions & Promo Codes](#6-managing-promotions--promo-codes)
7. [Managing Customers](#7-managing-customers)
8. [Regions & Shipping](#8-regions--shipping)
9. [Sales Channels](#9-sales-channels)
10. [Inventory & Stock](#10-inventory--stock)
11. [How Changes Reflect on the Website](#11-how-changes-reflect-on-the-website)
12. [Common Tasks (Step-by-Step)](#12-common-tasks-step-by-step)
13. [Important Notes & Tips](#13-important-notes--tips)

---

## 1. Logging In

1. Go to **https://glowreajo.com/app** (or http://localhost:9000/app for local development)
2. Enter your credentials:
   - **Email:** admin@glowreajo.com
   - **Password:** admin123
3. Click **Log In**

> **Tip:** Change the default password after your first login for security. Go to **Settings > Profile** to update it.

---

## 2. Dashboard Overview

After logging in, you'll see the admin sidebar with these main sections:

| Section | What It Does |
|---------|-------------|
| **Orders** | View and manage customer orders |
| **Products** | Add, edit, and organize products |
| **Categories** | Manage product categories |
| **Customers** | View customer information |
| **Promotions** | Create and manage promo/discount codes |
| **Pricing** | Manage price lists |
| **Settings** | Store settings, regions, shipping, sales channels |

---

## 3. Managing Products

Products are the core of the store. Each product you create here appears on the website.

### Viewing All Products

1. Click **Products** in the sidebar
2. You'll see a list of all products with their title, status, and thumbnail

### Creating a New Product

1. Click **Products** > **Create Product** (top-right button)
2. Fill in the following fields:

#### Basic Information

| Field | Description | Example | Required? |
|-------|-------------|---------|-----------|
| **Title** | Product name displayed on the website | "COSRX Low pH Good Morning Gel Cleanser" | Yes |
| **Handle** | URL-friendly slug (auto-generated from title) | "cosrx-low-ph-gel-cleanser" | Yes (auto) |
| **Description** | Product description shown on the product page | "A gentle daily cleanser with BHA..." | Yes |
| **Status** | Draft or Published — only Published products appear on the website | Published | Yes |

#### Media (Images)

- **Thumbnail:** The main image shown on product cards throughout the site (shop page, home page, cart). Upload a square image (recommended: 800x800px or larger).
- **Additional Images:** Extra images shown in the product gallery on the detail page. You can upload multiple.

> **How it appears on the website:** The thumbnail shows on product cards in the shop, home page bestsellers, and cart. All images appear in the product gallery slider on the product detail page.

#### Metadata (Custom Fields)

These are special fields that display extra info on the website. Click **Metadata** at the bottom of the product form to add them:

| Key | Value | Where It Shows |
|-----|-------|---------------|
| `brand` | Brand name (e.g., "COSRX", "Purito", "Klairs") | Shows above the product title on cards and detail page |
| `skin_type` | Target skin type (e.g., "Oily", "Dry", "Combination", "Sensitive", "All Skin Types") | Shows as a badge on the product detail page |
| `concerns` | Comma-separated concerns (e.g., "Acne, Pores, Hydration") | Shows as badges on the product detail page |

To add metadata:
1. Scroll to the bottom of the product edit page
2. Click **Metadata**
3. Click **Add Field**
4. Enter the key (e.g., `brand`) and value (e.g., `COSRX`)
5. Repeat for `skin_type` and `concerns` if applicable

#### Categories

- Assign one or more categories to the product (e.g., "Cleansers", "Serums & Essences")
- The first category is used for the **"You May Also Like"** related products section

> **How it appears on the website:** Products appear under their assigned category when customers filter by category on the shop page.

#### Tags

- Tags are used for special badges on the website
- If a product has **any tag**, it will show a **"Best Seller"** badge on its card

> **Tip:** Add a tag like "bestseller" to products you want to highlight.

#### Variants & Pricing

Every product needs at least one variant with a price:

1. In the product editor, go to the **Variants** section
2. Create a variant (e.g., "Default" or "150ml")
3. Set the **price** in **JOD** (Jordanian Dinar)
   - Enter the price as a number (e.g., `12.50` for 12.50 JOD)

> **How it appears on the website:** The price displays on product cards and the product detail page formatted as "12.50 JOD".

### Editing an Existing Product

1. Click **Products** in the sidebar
2. Click on the product you want to edit
3. Make your changes
4. Click **Save**

Changes appear on the website immediately (no need to rebuild or restart).

### Deleting a Product

1. Click **Products** > click the product
2. Click the **"..."** menu (top-right) > **Delete**
3. Confirm deletion

> **Warning:** Deleting a product removes it from the website immediately. If customers have it in their cart, it will no longer be available.

### Publishing / Unpublishing

- **Draft** products are NOT visible on the website
- **Published** products ARE visible on the website
- Use Draft status to prepare products before making them live

To change status:
1. Open the product
2. Change the **Status** dropdown from Draft to Published (or vice versa)
3. Save

---

## 4. Managing Categories

Categories help customers browse products by type.

### Current Categories

The store comes with these pre-configured categories:

1. Cleansers
2. Toners
3. Serums & Essences
4. Moisturizers
5. Sunscreens
6. Masks & Treatments
7. Sets & Bundles

### Where Categories Appear on the Website

- **Home page:** "Shop by Category" section with icons/cards
- **Shop page:** Filter sidebar on the left — customers can click a category to filter
- **Product page:** "You May Also Like" section shows products from the same category

### Creating a New Category

1. Click **Categories** in the sidebar
2. Click **Create Category**
3. Fill in:
   - **Name:** Category name (e.g., "Eye Care")
   - **Handle:** URL slug (auto-generated)
   - **Description:** Optional description
4. Click **Save**

### Assigning Products to Categories

1. Open a product
2. In the **Categories** section, search and select the category
3. Save

> **Note:** A product can belong to multiple categories.

---

## 5. Managing Orders

When a customer completes checkout on the website, an order is created here.

### Viewing Orders

1. Click **Orders** in the sidebar
2. You'll see all orders with:
   - **Order #** (display ID)
   - **Customer email**
   - **Total amount**
   - **Payment status**
   - **Fulfillment status**
   - **Date**

### Order Details

Click on any order to see:
- **Customer information** (name, email, phone)
- **Shipping address** (street, city, Jordan)
- **Line items** (products ordered, quantities, prices)
- **Order total** (subtotal, shipping, discounts, total)
- **Payment status**
- **Order notes** (if the customer added any)

### Order Fulfillment

After preparing the order for delivery:

1. Open the order
2. Click **Create Fulfillment**
3. Select the items to fulfill
4. Click **Fulfill**

This marks the order as fulfilled/shipped.

### Order Flow

```
Order Placed → Payment Captured → Fulfilled (Shipped) → Delivered
```

- **Not Fulfilled:** Order received, not yet shipped
- **Fulfilled:** Order has been shipped/delivered
- **Canceled:** Order was canceled (refund may be needed)

---

## 6. Managing Promotions & Promo Codes

Promotions let you offer discounts to customers via promo codes.

### Current Promo Codes

| Code | Discount | Type |
|------|----------|------|
| `GLOW20` | 20% off | Percentage |
| `WELCOME10` | 10% off | Percentage |

### Where Promo Codes Are Used

Customers can enter promo codes in two places:
- **Cart drawer** (slide-out cart from any page)
- **Checkout page** (cart review step)

The discount is shown as a line item in the order summary.

### Creating a New Promo Code

1. Click **Promotions** in the sidebar
2. Click **Create Promotion**
3. Fill in:

| Field | Description | Example |
|-------|-------------|---------|
| **Code** | The code customers enter | `SUMMER15` |
| **Type** | Standard (manual code entry) | Standard |
| **Application Method** | How discount is calculated | |
| — Type | "Percentage" or "Fixed Amount" | Percentage |
| — Value | Discount value | `15` (for 15%) |
| — Target Type | What the discount applies to | "Order" (entire order) |
| **Campaign Identifier** | Unique identifier for the campaign | `SUMMER15` |
| **Starts At** | When the promo becomes active | 2025-01-01 |
| **Ends At** | When the promo expires | 2025-12-31 |

4. Click **Save**

### Activating / Deactivating a Promo

- A promotion's **status** controls whether it can be used
- You can also use **Starts At** and **Ends At** dates to auto-activate/expire promos
- Customers will see an error message if they try to use an expired or inactive code

### How Discounts Work on the Website

1. Customer adds items to cart
2. Customer enters promo code in the promo input field
3. Website validates the code against the admin panel
4. If valid: discount amount is calculated and shown
5. The discount is applied to the order total at checkout

---

## 7. Managing Customers

### Viewing Customers

1. Click **Customers** in the sidebar
2. See a list of all customers who have placed orders

### Customer Information

Each customer profile shows:
- Email address
- Name (from their shipping address)
- Order history
- Phone number

> **Note:** Customers are created automatically when they place their first order. There is no separate registration — the checkout collects their information.

---

## 8. Regions & Shipping

### Region: Jordan

The store is configured for a single region:
- **Country:** Jordan (JO)
- **Currency:** JOD (Jordanian Dinar)
- **Payment:** System default (Cash on Delivery / manual payment)

### Shipping Options

Currently configured:
- **Free Delivery** — 0.00 JOD flat rate for all of Jordan

### Adding a Paid Shipping Option

If you want to add a shipping option with a fee:

1. Go to **Settings** > **Regions** > **Jordan**
2. Find **Shipping Options**
3. Click **Add Shipping Option**
4. Set the name (e.g., "Express Delivery") and price

> **Note:** Shipping configuration changes may require technical assistance. Contact your developer if needed.

---

## 9. Sales Channels

### What Is a Sales Channel?

A sales channel determines where products are sold. The store has one channel:
- **GlowReaJo Webshop** — The main online storefront

### Why It Matters

- Only products **linked to the "GlowReaJo Webshop" sales channel** appear on the website
- When creating a new product, make sure it is added to this sales channel

### Checking a Product's Sales Channel

1. Open the product
2. Look for the **Sales Channels** section
3. Ensure **"GlowReaJo Webshop"** is selected

> **Common issue:** If a product doesn't appear on the website, the most common cause is that it's not assigned to the "GlowReaJo Webshop" sales channel, or its status is "Draft" instead of "Published".

---

## 10. Inventory & Stock

### Stock Location

The store has one stock location:
- **GlowReaJo Warehouse** — Amman, Jordan

### Managing Inventory

1. Open a product
2. Go to the variant
3. Set **Manage Inventory** and specify stock quantities

> **Tip:** If you don't want to track inventory (unlimited stock), leave inventory management disabled on the variant.

---

## 11. How Changes Reflect on the Website

Here's a quick reference of what happens on the website when you make changes in the admin panel:

| Admin Action | Website Effect | Timing |
|-------------|---------------|--------|
| **Publish a product** | Product appears on shop page, search results, and home page sections | Immediate |
| **Unpublish a product** | Product disappears from the website | Immediate |
| **Edit product title/description** | Updated text shows on the website | Immediate |
| **Change product price** | New price displays on product cards and detail page | Immediate |
| **Upload/change product image** | New image appears on the website | Immediate |
| **Add product to a category** | Product appears when filtering by that category | Immediate |
| **Remove product from category** | Product no longer appears under that category filter | Immediate |
| **Add a tag to a product** | "Best Seller" badge appears on the product card | Immediate |
| **Create a new category** | Category appears in the shop page filter sidebar | Immediate |
| **Create a promo code** | Customers can immediately use the code at checkout | Immediate |
| **Deactivate a promo code** | Customers will see "Invalid promo code" when trying to use it | Immediate |
| **Fulfill an order** | Order status updates (customer not notified automatically unless email is configured) | Immediate |
| **Add metadata (brand, skin_type, concerns)** | Brand label, skin type badge, and concern badges appear on the product | Immediate |

> **Key point:** All changes are **immediate** — no need to rebuild or restart anything. The website fetches data from the admin in real-time.

---

## 12. Common Tasks (Step-by-Step)

### Task 1: Add a New Product

1. **Products** > **Create Product**
2. Enter title, description
3. Upload thumbnail image (and additional images if available)
4. Set status to **Published**
5. Add **Metadata**:
   - `brand` = brand name
   - `skin_type` = target skin type
   - `concerns` = comma-separated concerns
6. Assign a **Category** (e.g., "Serums & Essences")
7. Add a **Tag** if it's a bestseller
8. Create a **Variant** and set the **price in JOD**
9. Ensure **"GlowReaJo Webshop"** sales channel is selected
10. Click **Save**

### Task 2: Change a Product's Price

1. **Products** > click the product
2. Go to **Variants** section
3. Click on the variant
4. Update the **price** (in JOD)
5. Click **Save**

### Task 3: Mark a Product as Best Seller

1. **Products** > click the product
2. Go to **Tags** section
3. Add a tag (e.g., "bestseller")
4. Click **Save**
5. The product card will now show a "Best Seller" badge

### Task 4: Create a Holiday Promo Code

1. **Promotions** > **Create Promotion**
2. Code: `HOLIDAY25`
3. Type: Standard
4. Application Method: Percentage, 25%
5. Target: Order
6. Campaign Identifier: `HOLIDAY25`
7. Starts At: Start of the holiday period
8. Ends At: End of the holiday period
9. Click **Save**

Share `HOLIDAY25` with customers via social media or marketing.

### Task 5: Process an Order

1. **Orders** > click the order
2. Review the order details (items, address, payment)
3. Prepare the package
4. Click **Create Fulfillment** > select items > **Fulfill**
5. The order status changes to "Fulfilled"

### Task 6: Hide a Product Temporarily

1. **Products** > click the product
2. Change **Status** from "Published" to **"Draft"**
3. Click **Save**
4. The product is hidden from the website but not deleted

To bring it back, change status back to "Published".

### Task 7: Update Product Images

1. **Products** > click the product
2. In the **Media** section:
   - Click the X on old images to remove them
   - Click **Upload** to add new images
   - The first image or designated thumbnail is the main product image
3. Click **Save**

---

## 13. Important Notes & Tips

### Product Visibility Checklist

If a product is not appearing on the website, check these:

- [ ] Status is **Published** (not Draft)
- [ ] Product is assigned to **"GlowReaJo Webshop"** sales channel
- [ ] Product has at least one **variant with a JOD price**
- [ ] Product has a **category** assigned (for it to appear in category filters)

### Image Recommendations

- **Thumbnail:** Square image, minimum 800x800px, JPG or PNG
- **File size:** Keep under 2MB for fast loading
- **Background:** Clean white or light background works best
- **Format:** JPG for photos, PNG if transparency is needed

### Currency

- All prices are in **JOD (Jordanian Dinar)**
- Enter prices as decimal numbers (e.g., `15.00` for fifteen dinars)
- The website automatically formats prices with the "JOD" suffix

### What You Cannot Change from Admin

These require developer assistance:
- Website design and layout
- Checkout flow steps
- Adding new payment methods
- Email notification templates
- Store logo and branding
- Shipping zone changes (adding countries beyond Jordan)

### Support

For technical issues or changes not covered in this guide, contact your developer.

---

*Last updated: February 2026*
