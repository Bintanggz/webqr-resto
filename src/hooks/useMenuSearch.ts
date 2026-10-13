import { useState, useMemo } from 'react';
import type { MenuItem } from '../types/menu';

export type QuickFilterType = 'all' | 'popular' | 'new' | 'pedas' | 'vegetarian';

export function useMenuSearch(items: MenuItem[]) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeQuickFilter, setActiveQuickFilter] = useState<QuickFilterType>('all');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Filter Kategori
      const matchCategory =
        selectedCategory === 'all' || item.categoryId === selectedCategory;

      // 2. Filter Teks Pencarian (nama & deskripsi dalam ID maupun EN)
      const cleanQuery = query.toLowerCase().trim();
      const matchQuery =
        !cleanQuery ||
        item.name.toLowerCase().includes(cleanQuery) ||
        item.description.toLowerCase().includes(cleanQuery) ||
        (item.nameEn ? item.nameEn.toLowerCase().includes(cleanQuery) : false) ||
        (item.descriptionEn ? item.descriptionEn.toLowerCase().includes(cleanQuery) : false);

      // 3. Filter Cepat (Quick Filters)
      let matchQuickFilter = true;
      if (activeQuickFilter === 'popular') {
        matchQuickFilter = item.isPopular || Boolean(item.tags?.includes('terlaris'));
      } else if (activeQuickFilter === 'new') {
        matchQuickFilter = item.isNew || Boolean(item.tags?.includes('baru'));
      } else if (activeQuickFilter === 'pedas') {
        matchQuickFilter = Boolean(item.tags?.includes('pedas'));
      } else if (activeQuickFilter === 'vegetarian') {
        matchQuickFilter = Boolean(item.tags?.includes('vegetarian'));
      }

      return matchCategory && matchQuery && matchQuickFilter;
    });
  }, [items, selectedCategory, query, activeQuickFilter]);

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    activeQuickFilter,
    setActiveQuickFilter,
    filteredItems,
  };
}
