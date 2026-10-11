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
import { Printer } from 'lucide-react';

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
  const activeSpyId = useScrollSpy(categoryIds, 120);

  // Validasi konfigurasi & data menu
  const configValidation = useMemo(() => validateSiteConfig(siteConfig), []);
  const menuValidation = useMemo(() => validateMenuData(menuData), []);

  const hasConfigIssues =
    configValidation.errors.length > 0 ||
    configValidation.warnings.length > 0 ||
    menuValidation.errors.length > 0 ||
    menuValidation.warnings.length > 0;

  // Buka detail modal item saat kartu menu diklik
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
          <div
            style={{ backgroundColor: 'var(--bg)', color: 'var(--text-muted)' }}
            className="min-h-screen flex items-center justify-center p-6 text-center text-sm font-medium"
          >
            <div className="flex flex-col items-center gap-2">
              <Printer className="w-8 h-8 stroke-[1.5]" style={{ color: 'var(--primary)' }} />
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

  // Jika user membuka URL yang tidak dikenal, tampilkan halaman 404
  if (isNotFound) {
    return (
      <NotFoundPage
        onBackHome={() => {
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/');
          }
          setIsNotFound(false);
        }}
        t={t}
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
      }}
      className="min-h-screen flex flex-col font-sans transition-colors relative"
    >
      {/* 0. Peringatan Validasi Config & Menu */}
      {hasConfigIssues && (
        <ConfigErrorAlert
          errors={[...configValidation.errors, ...menuValidation.errors]}
          warnings={[...configValidation.warnings, ...menuValidation.warnings]}
        />
      )}

      {/* Top Action Bar: Ganti Bahasa ID/EN, Bagikan Menu, Hubungi WA */}
      <TopActionBar currentLang={lang} onToggleLang={setLang} t={t} />

      {/* 1. Header Identitas Usaha */}
      <Header nomorMeja={tableNumber} />

      {/* Kontainer Pencarian, Promo, & Filter Cepat */}
      <div className="app-container py-4 space-y-3">
        {/* 2. Banner Promo Carousel */}
        {siteConfig.features.promoBanner && siteConfig.promo && siteConfig.promo.length > 0 && (
          <PromoCarousel promos={siteConfig.promo} />
        )}

        {/* 3. Bar Pencarian Menu Real-Time (Lebar maksimum di tengah, tidak meregang penuh) */}
        {siteConfig.features.search && (
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={t('searchPlaceholder')}
            totalResults={isFiltering ? filteredItems.length : undefined}
          />
        )}

        {/* Filter Cepat (Terlaris, Baru, Pedas, Vegetarian) */}
        {siteConfig.features.quickFilter && (
          <QuickFilters
            activeFilter={activeQuickFilter}
            onSelectFilter={setActiveQuickFilter}
            t={t}
          />
        )}
      </div>

      {/* 4. Tab Kategori Sticky dengan Scroll-Spy (Teks dengan Underline, Tanpa Emoji) */}
      <CategoryTabs
        categories={menuData.categories}
        activeCategoryId={isFiltering ? 'all' : activeSpyId}
        onSelectCategory={handleSelectCategory}
        totalAllItems={menuData.items.length}
      />

      {/* 5. Daftar Item Menu */}
      <main className="app-container py-6 flex-1">
        {/* Tampilan Jika Sedang Mencari Menu atau Menggunakan Filter */}
        {isFiltering ? (
          <section className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{ color: 'var(--text)' }}
                className="text-sm font-semibold uppercase tracking-wider"
              >
                {t('searchPlaceholder')}
              </h2>
              <span
                style={{ color: 'var(--text-muted)' }}
                className="text-xs"
              >
                {t('menuCount', { count: filteredItems.length })}
              </span>
            </div>

            {filteredItems.length > 0 ? (
              <div className="menu-grid">
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
          <div className="space-y-10">
            {menuData.categories.map((cat) => {
              const categoryItems = menuData.items.filter(
                (item) => item.categoryId === cat.id
              );
              if (categoryItems.length === 0) return null;

              return (
                <section
                  key={cat.id}
                  id={`category-${cat.id}`}
                  className="scroll-mt-20 pt-2"
                >
                  {/* Header Kategori: Nama kategori 24px (desktop 28px), tanpa emoji */}
                  <div
                    style={{ borderColor: 'var(--border)' }}
                    className="flex items-center justify-between pb-3 mb-6 border-b"
                  >
                    <div>
                      <h2
                        style={{
                          color: 'var(--text)',
                          fontFamily: 'var(--font-heading)',
                        }}
                        className="text-[24px] lg:text-[28px] font-semibold leading-tight"
                      >
                        {cat.name}
                      </h2>
                    </div>
                    <span
                      style={{
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                      }}
                      className="text-xs font-medium px-2.5 py-0.5 rounded-[4px]"
                    >
                      {t('menuCount', { count: categoryItems.length })}
                    </span>
                  </div>

                  {/* Grid Menu Responsif: 1 col (mobile) → 2 col (tablet) → 3 col (lg) → 4 col (xl) */}
                  <div className="menu-grid">
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

      {/* 6. Footer Usaha Lengkap */}
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
        onClose={() => {
          setIsModalOpen(false);
          setActiveItem(null);
        }}
        onAddToCart={handleAddToCart}
        isViewOnly={isViewOnly}
      />

      {/* 8. Floating Bar Ringkasan Pesanan (Mobile & Tablet) */}
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
  );
}

export default App;
