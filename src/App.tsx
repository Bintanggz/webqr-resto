import { useState, useMemo, lazy, Suspense } from 'react';
import { siteConfig } from './config/site.config';
import menuData from './data/menu.json';
import { Header } from './components/layout/Header';
import { TopActionBar } from './components/layout/TopActionBar';
import { PromoCarousel } from './components/promo/PromoCarousel';
import { SearchBar } from './components/menu/SearchBar';
import { QuickFilters } from './components/menu/QuickFilters';
import { CategoryTabs } from './components/layout/CategoryTabs';
import { MenuCard } from './components/menu/MenuCard';
import { ItemDetailModal } from './components/menu/ItemDetailModal';
import { CartFloatingBar } from './components/cart/CartFloatingBar';
import { CartDrawer } from './components/cart/CartDrawer';
import { Footer } from './components/layout/Footer';
import { ConfigErrorAlert } from './components/common/ConfigErrorAlert';
import { SearchEmptyState } from './components/common/SearchEmptyState';
import { NotFoundPage } from './components/common/NotFoundPage';
import { useCart } from './hooks/useCart';
import { useMenuSearch } from './hooks/useMenuSearch';
import { useTableNumber } from './hooks/useTableNumber';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { useSeo } from './hooks/useSeo';
import { validateSiteConfig, validateMenuData } from './utils/validation';
import type { MenuItem } from './types/menu';

// Code splitting: Generator QR di-load hanya saat rute /qr dibuka
const QrGeneratorPage = lazy(() =>
  import('./components/qr/QrGeneratorPage').then((m) => ({ default: m.QrGeneratorPage }))
);

export function App() {
  // Inisialisasi tema, preset, dan pendeteksi dark mode otomatis
  useTheme();

  // Sinkronisasi Meta Tags SEO & Open Graph (WhatsApp, Google, Twitter)
  useSeo();

  // Multi-bahasa ringan (ID / EN)
  const { lang, setLang, t } = useLanguage();

  // Deteksi rute halaman /qr atau query ?page=qr
  const checkIsQr = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    return path === '/qr' || path === '/qr/' || search.get('page') === 'qr';
  };

  const [isQrPage, setIsQrPage] = useState(checkIsQr);

  // State untuk deteksi halaman 404 (jika user membuka path URL non-root dan bukan /qr)
  const [isNotFound, setIsNotFound] = useState(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    if (path === '/' || path === '' || path === '/qr' || path === '/qr/' || path.endsWith('index.html')) {
      return false;
    }
    return true;
  });

  const [tableNumber, , isTableLocked] = useTableNumber();
  const {
    items: cartItems,
    addItem,
    updateQuantity,
    updateNotes,
    removeItem,
    clearCart,
    totalItems,
    totalHarga,
  } = useCart();

  // Search & Quick Filter state
  const {
    query,
    setQuery,
    activeQuickFilter,
    setActiveQuickFilter,
    filteredItems,
  } = useMenuSearch(menuData.items as MenuItem[]);

  // Modal Detail Item State
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Drawer Keranjang Belanja State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Status Mode "Hanya Lihat Menu" (Tanpa keranjang)
  const isViewOnly = Boolean(siteConfig.features.viewOnlyMode || !siteConfig.features.cart);

  // Kategori IDs untuk Scroll-Spy
  const categoryIds = useMemo(
    () => menuData.categories.map((c) => c.id),
    []
  );

  // Hook Scroll-Spy otomatis mendeteksi kategori yang sedang terlihat di layar
  const activeSpyId = useScrollSpy(categoryIds, 110);

  // Validasi konfigurasi & menu JSON saat runtime
  const configValidation = useMemo(() => validateSiteConfig(siteConfig), []);
  const menuValidation = useMemo(() => validateMenuData(menuData), []);

  const allErrors = useMemo(
    () => [...configValidation.errors, ...menuValidation.errors],
    [configValidation, menuValidation]
  );
  const allWarnings = useMemo(
    () => [...configValidation.warnings, ...menuValidation.warnings],
    [configValidation, menuValidation]
  );

  // Buka modal detail item
  const handleSelectItem = (item: MenuItem) => {
    setActiveItem(item);
    setIsModalOpen(true);
  };

  // Tambah item ke keranjang dari modal
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedVariants: Record<string, string>,
    selectedAddons: string[],
    notes: string,
    calculatedUnitPrice: number
  ) => {
    if (isViewOnly) return;
    addItem(
      item,
      quantity,
      selectedVariants,
      selectedAddons,
      notes,
      calculatedUnitPrice
    );
  };

  // Handler klik tab kategori (Smooth Scroll ke section kategori)
  const handleSelectCategory = (catId: string) => {
    if (query) {
      setQuery(''); // Reset pencarian jika user memilih tab kategori
    }

    if (catId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.getElementById(`category-${catId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const isFiltering = Boolean(query.trim() || activeQuickFilter !== 'all');

  // Jika membuka rute /qr, tampilkan halaman Generator QR Meja Siap Cetak
  if (isQrPage) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center p-6 text-center text-sm font-bold text-slate-600 bg-slate-50">
            <div className="animate-pulse flex flex-col items-center gap-2">
              <span className="text-3xl">🖨️</span>
              <span>Memuat Generator QR Meja...</span>
            </div>
          </div>
        }
      >
        <QrGeneratorPage
          onBackToMenu={() => {
            if (typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
            setIsQrPage(false);
          }}
        />
      </Suspense>
    );
  }

  // Jika membuka path yang tidak ada, tampilkan halaman 404
  if (isNotFound) {
    return (
      <NotFoundPage
        t={t}
        onBackHome={() => {
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/');
          }
          setIsNotFound(false);
        }}
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-page)',
        color: 'var(--color-text-main)',
        fontFamily: 'var(--font-theme)',
      }}
      className="min-h-screen flex justify-center transition-colors duration-200"
    >
      {/* Container Utama Mobile-First (Maks 480px, Terpusat di Desktop) */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
        }}
        className={`w-full max-w-lg min-h-screen shadow-2xl flex flex-col relative ${
          !isViewOnly && siteConfig.features.cart ? 'pb-28' : 'pb-12'
        } border-x transition-colors duration-200`}
      >
        {/* Top Action Bar: Ganti Bahasa, Bagikan Menu, Hubungi WhatsApp */}
        {(siteConfig.features.multiLanguage ||
          siteConfig.features.shareMenu ||
          siteConfig.features.contactWhatsApp) && (
          <TopActionBar
            currentLang={lang}
            onToggleLang={setLang}
            t={t}
          />
        )}

        {/* 1. Header Usaha (Logo, Banner, Info, Status Buka/Tutup) */}
        <Header nomorMeja={tableNumber} />

        {/* Banner Mode Hanya Lihat Menu (Jika Aktif) */}
        {siteConfig.features.viewOnlyMode && (
          <div
            style={{
              backgroundColor: 'var(--color-primary-light)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-primary)',
            }}
            className="px-4 py-2 border-y text-xs font-semibold flex items-center justify-between"
          >
            <span>{t('viewOnlyBadge')}</span>
            <span className="text-[11px] opacity-80">{t('viewOnlyNote')}</span>
          </div>
        )}

        {/* Peringatan Format JSON Jika Ada Error */}
        <ConfigErrorAlert errors={allErrors} warnings={allWarnings} />

        {/* 2. Promo Banner Carousel (Tampil jika fitur aktif) */}
        {siteConfig.features.promoBanner && (
          <PromoCarousel promos={siteConfig.promo} />
        )}

        {/* 3. Bar Pencarian Menu Real-Time */}
        {siteConfig.features.search && (
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={t('searchPlaceholder')}
            totalResults={isFiltering ? filteredItems.length : undefined}
          />
        )}

        {/* Filter Cepat (Terlaris, Baru, Pedas, Vegetarian, dll) */}
        {siteConfig.features.quickFilter && (
          <QuickFilters
            activeFilter={activeQuickFilter}
            onSelectFilter={setActiveQuickFilter}
            t={t}
          />
        )}

        {/* 4. Tab Kategori Sticky dengan Scroll-Spy */}
        <CategoryTabs
          categories={menuData.categories}
          activeCategoryId={isFiltering ? 'all' : activeSpyId}
          onSelectCategory={handleSelectCategory}
          totalAllItems={menuData.items.length}
        />

        {/* 5. Daftar Item Menu */}
        <main className="px-4 py-2 flex-1">
          {/* Tampilan Jika Sedang Mencari Menu atau Menggunakan Filter */}
          {isFiltering ? (
            <section className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h2
                  style={{ color: 'var(--color-text-main)' }}
                  className="text-sm font-bold"
                >
                  {t('searchPlaceholder')}
                </h2>
                <span
                  style={{ color: 'var(--color-text-muted)' }}
                  className="text-xs"
                >
                  {t('menuCount', { count: filteredItems.length })}
                </span>
              </div>

              {filteredItems.length > 0 ? (
                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onSelect={handleSelectItem}
                      isViewOnly={isViewOnly}
                    />
                  ))}
                </div>
              ) : (
                <SearchEmptyState
                  query={query || (activeQuickFilter !== 'all' ? activeQuickFilter : undefined)}
                  onReset={() => {
                    setQuery('');
                    setActiveQuickFilter('all');
                  }}
                  t={t}
                />
              )}
            </section>
          ) : (
            /* Tampilan Normal: Dikelompokkan Per Kategori dengan Scroll-Margin */
            <div className="space-y-6">
              {menuData.categories.map((cat) => {
                const categoryItems = menuData.items.filter(
                  (item) => item.categoryId === cat.id
                );
                if (categoryItems.length === 0) return null;

                return (
                  <section
                    key={cat.id}
                    id={`category-${cat.id}`}
                    className="scroll-mt-16 pt-3"
                  >
                    {/* Header Kategori */}
                    <div
                      style={{ borderColor: 'var(--color-border)' }}
                      className="flex items-center justify-between pb-2.5 mb-3 border-b"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl" role="img" aria-label={cat.name}>
                          {cat.icon}
                        </span>
                        <div>
                          <h2
                            style={{ color: 'var(--color-text-main)' }}
                            className="text-base font-extrabold tracking-tight leading-tight"
                          >
                            {cat.name}
                          </h2>
                        </div>
                      </div>
                      <span
                        style={{
                          backgroundColor: 'var(--color-primary-light)',
                          color: 'var(--color-primary)',
                          borderRadius: 'var(--radius-theme)',
                        }}
                        className="text-[11px] font-bold px-2 py-0.5"
                      >
                        {t('menuCount', { count: categoryItems.length })}
                      </span>
                    </div>

                    {/* Kartu-kartu Menu dalam Kategori */}
                    <div className="space-y-3">
                      {categoryItems.map((item) => (
                        <MenuCard
                          key={item.id}
                          item={item}
                          onSelect={handleSelectItem}
                          isViewOnly={isViewOnly}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </main>

        {/* 6. Footer Usaha Lengkap dengan Jam Buka, Maps, & Instagram */}
        <Footer
          t={t}
          onOpenQr={() => {
            if (typeof window !== 'undefined') {
              window.history.pushState({}, '', '/qr');
            }
            setIsQrPage(true);
          }}
        />

        {/* 7. Modal / Bottom-Sheet Detail Item Saat Diklik */}
        <ItemDetailModal
          item={activeItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleAddToCart}
          isViewOnly={isViewOnly}
          t={t}
        />

        {/* 8. Floating Bar Ringkasan Pesanan (Hanya tampil jika fitur cart aktif dan bukan viewOnlyMode) */}
        {!isViewOnly && siteConfig.features.cart && (
          <CartFloatingBar
            totalItems={totalItems}
            totalHarga={totalHarga}
            onClick={() => setIsCartDrawerOpen(true)}
          />
        )}

        {/* 9. Drawer / Bottom-Sheet Keranjang & Checkout WhatsApp */}
        {!isViewOnly && siteConfig.features.cart && (
          <CartDrawer
            isOpen={isCartDrawerOpen}
            onClose={() => setIsCartDrawerOpen(false)}
            items={cartItems}
            totalItems={totalItems}
            totalHarga={totalHarga}
            onUpdateQuantity={updateQuantity}
            onUpdateNotes={updateNotes}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
            initialTableNumber={tableNumber}
            isTableLocked={isTableLocked}
          />
        )}
      </div>
    </div>
  );
}

export default App;
