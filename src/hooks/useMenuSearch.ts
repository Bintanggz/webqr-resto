import { useState, useMemo } from 'react';
import type { MenuItem } from '../types/menu';

export function useMenuSearch(items: MenuItem[]) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filter kategori
      const matchCategory =
        selectedCategory === 'all' || item.categoryId === selectedCategory;

      // Filter teks pencarian (nama & deskripsi)
      const cleanQuery = query.toLowerCase().trim();
      const matchQuery =
        !cleanQuery ||
        item.name.toLowerCase().includes(cleanQuery) ||
        item.description.toLowerCase().includes(cleanQuery);

      return matchCategory && matchQuery;
    });
  }, [items, selectedCategory, query]);

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    filteredItems,
  };
}
