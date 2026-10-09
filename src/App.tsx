import { useState, useMemo } from 'react';
import { siteConfig } from './config/site.config';
import menuData from './data/menu.json';
import { Header } from './components/layout/Header';
import { PromoCarousel } from './components/promo/PromoCarousel';
import { SearchBar } from './components/menu/SearchBar';
import { CategoryTabs } from './components/layout/CategoryTabs';
import { MenuCard } from './components/menu/MenuCard';
import { ItemDetailModal } from './components/menu/ItemDetailModal';
import { CartFloatingBar } from './components/cart/CartFloatingBar';
import { CartDrawer } from './components/cart/CartDrawer';
import { ConfigErrorAlert } from './components/common/ConfigErrorAlert';
import { useCart } from './hooks/useCart';
import { useMenuSearch } from './hooks/useMenuSearch';
import { useTableNumber } from './hooks/useTableNumber';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useTheme } from './hooks/useTheme';
import { validateSiteConfig, validateMenuData } from './utils/validation';
import type { MenuItem } from './types/menu';

export function App() {
  // Inisialisasi tema, preset, dan pendeteksi dark mode otomatis
  useTheme();

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

  // Search state
  const {
    query,
    setQuery,
    filteredItems,
  } = useMenuSearch(menuData.items as MenuItem[]);

  // Modal Detail Item State
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Drawer Keranjang Belanja State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

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

  const isSearching = Boolean(query.trim());

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
        className="w-full max-w-lg min-h-screen shadow-2xl flex flex-col relative pb-28 border-x transition-colors duration-200"
      >
        {/* 1. Header Usaha (Logo, Banner, Info, Status Buka/Tutup) */}
        <Header nomorMeja={tableNumber} />

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
            placeholder="Cari nasi goreng, mie ayam, kopi..."
            totalResults={isSearching ? filteredItems.length : undefined}
          />
        )}

        {/* 4. Tab Kategori Sticky dengan Scroll-Spy */}
        <CategoryTabs
          categories={menuData.categories}
          activeCategoryId={isSearching ? 'all' : activeSpyId}
          onSelectCategory={handleSelectCategory}
          totalAllItems={menuData.items.length}
        />

        {/* 5. Daftar Item Menu */}
        <main className="px-4 py-2 flex-1">
          {/* Tampilan Jika Sedang Mencari Menu */}
          {isSearching ? (
            <section className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <h2
                  style={{ color: 'var(--color-text-main)' }}
                  className="text-sm font-bold"
                >
                  Hasil Pencarian Menu
                </h2>
                <span
                  style={{ color: 'var(--color-text-muted)' }}
                  className="text-xs"
                >
                  {filteredItems.length} menu ditemukan
                </span>
              </div>

              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onSelect={handleSelectItem}
                  />
                ))}

                {filteredItems.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-3xl mb-2">🔍</p>
                    <p
                      style={{ color: 'var(--color-text-main)' }}
                      className="text-sm font-bold"
                    >
                      Menu tidak ditemukan
                    </p>
                    <p
                      style={{ color: 'var(--color-text-muted)' }}
                      className="text-xs mt-1"
                    >
                      Coba gunakan kata kunci lain seperti &ldquo;nasi&rdquo;, &ldquo;kopi&rdquo;, atau &ldquo;ayam&rdquo;.
                    </p>
                  </div>
                )}
              </div>
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
                        {categoryItems.length} menu
                      </span>
                    </div>

                    {/* Kartu-kartu Menu dalam Kategori */}
                    <div className="space-y-3">
                      {categoryItems.map((item) => (
                        <MenuCard
                          key={item.id}
                          item={item}
                          onSelect={handleSelectItem}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </main>

        {/* Footer Usaha */}
        <footer
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg-page)',
            color: 'var(--color-text-muted)',
          }}
          className="mt-8 px-4 py-6 text-center border-t text-xs"
        >
          <p
            style={{ color: 'var(--color-text-main)' }}
            className="font-bold"
          >
            {siteConfig.restaurant.name}
          </p>
          <p className="mt-0.5">{siteConfig.restaurant.address}</p>
          <p className="mt-2 text-[11px] opacity-80">
            Jam Buka: {siteConfig.restaurant.openingHours}
          </p>
          <p className="mt-3 text-[10px] opacity-60 font-medium">
            Menu Digital QR • Dipersembahkan untuk UMKM Kuliner Indonesia
          </p>
        </footer>

        {/* 6. Modal / Bottom-Sheet Detail Item Saat Diklik */}
        <ItemDetailModal
          item={activeItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleAddToCart}
        />

        {/* 7. Floating Bar Ringkasan Pesanan (Jika fitur cart aktif) */}
        {siteConfig.features.cart && (
          <CartFloatingBar
            totalItems={totalItems}
            totalHarga={totalHarga}
            onClick={() => setIsCartDrawerOpen(true)}
          />
        )}

        {/* 8. Drawer / Bottom-Sheet Keranjang & Checkout WhatsApp */}
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
      </div>
    </div>
  );
}

export default App;
