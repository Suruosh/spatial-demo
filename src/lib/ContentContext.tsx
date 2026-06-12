import { createContext, useContext, useState, type ReactNode } from 'react';

export type ContentView = 'welcome' | 'team' | 'catalog' | 'product' | 'cart' | 'checkout';

interface ContentContextType {
  view: ContentView;
  setView: (view: ContentView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ContentView>('welcome');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  return (
    <ContentContext.Provider value={{ view, setView, selectedProductId, setSelectedProductId }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentView() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContentView must be used within ContentProvider');
  }
  return context;
}
