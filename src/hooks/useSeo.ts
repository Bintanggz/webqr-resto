import { useEffect } from 'react';
import { siteConfig } from '../config/site.config';

/**
 * Hook untuk menyinkronkan Meta Tags SEO & Open Graph (WhatsApp, Google, Twitter)
 * secara dinamis berdasarkan siteConfig.restaurant
 */
export function useSeo() {
  useEffect(() => {
    const { restaurant } = siteConfig;
    const pageTitle = `${restaurant.name} - ${restaurant.tagline} | Menu Digital QR`;
    const pageDesc = `Buku menu digital ${restaurant.name}. Pesan aneka menu lezat langsung via WhatsApp dari meja Anda tanpa antre. Alamat: ${restaurant.address}.`;
    const pageImage = restaurant.banner.startsWith('http')
      ? restaurant.banner
      : `${window.location.origin}${restaurant.banner}`;
    const pageUrl = window.location.href;

    // 1. Update Title Document
    document.title = pageTitle;

    // 2. Helper untuk update atau buat meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Standard SEO
    setMeta('description', pageDesc);
    setMeta('robots', 'index, follow');

    // Open Graph (WhatsApp, Facebook, LinkedIn)
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', restaurant.name, true);
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', pageDesc, true);
    setMeta('og:image', pageImage, true);
    setMeta('og:url', pageUrl, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageDesc);
    setMeta('twitter:image', pageImage);

    // Theme Color untuk status bar mobile browser
    let themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = siteConfig.theme.primaryColor || '#d97706';
  }, []);
}
