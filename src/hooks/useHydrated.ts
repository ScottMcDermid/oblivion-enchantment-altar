'use client';

import { useEffect, useState } from 'react';
import { useEnchantmentStore } from '@/data/enchantmentStore';

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useEnchantmentStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    const unsub = useEnchantmentStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  return hydrated;
}
