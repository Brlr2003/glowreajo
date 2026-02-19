const SITE_URL = "https://glowreajo.com"

export function buildProductJsonLd(product: any) {
  const variant = product.variants?.[0]
  const price = variant?.calculated_price?.calculated_amount
    ?? variant?.prices?.find((p: any) => p.currency_code === "jod")?.amount
    ?? 0
  const image = product.thumbnail || product.images?.[0]?.url || `${SITE_URL}/placeholder-product.svg`
  const inStock = variant?.manage_inventory === false || (variant?.inventory_quantity ?? 0) > 0

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `Shop ${product.title} - authentic Korean skincare at GlowReaJo.`,
    image,
    url: `${SITE_URL}/product/${product.handle}`,
    brand: {
      "@type": "Brand",
      name: (product.metadata as any)?.brand || "GlowReaJo",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.handle}`,
      priceCurrency: "JOD",
      price: price.toFixed(2),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "GlowReaJo",
      },
    },
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GlowReaJo",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: "Your trusted Korean skincare destination in Jordan. Authentic K-beauty products from top brands.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "JO",
      availableLanguage: ["English", "Arabic"],
    },
  }
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GlowReaJo",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function buildCollectionJsonLd(category: any, productCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.metadata?.description || `Shop ${category.name} at GlowReaJo`,
    url: `${SITE_URL}/shop/${category.handle}`,
    numberOfItems: productCount,
    isPartOf: {
      "@type": "WebSite",
      name: "GlowReaJo",
      url: SITE_URL,
    },
  }
}

export function buildFaqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }
}

export function buildBlogPostJsonLd(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.seo_description,
    image: post.cover_image || `${SITE_URL}/og-image.png`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Person",
      name: post.author || "GlowReaJo Team",
    },
    publisher: {
      "@type": "Organization",
      name: "GlowReaJo",
      url: SITE_URL,
    },
  }
}
