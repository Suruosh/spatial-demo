import { createContext, useContext, useState, type ReactNode } from 'react';

type ContentView = 'welcome' | 'team' | 'catalog';

interface ContentContextType {
  view: ContentView;
  setView: (view: ContentView) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ContentView>('welcome');

  return (
    <ContentContext.Provider value={{ view, setView }}>
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
