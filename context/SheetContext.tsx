import React, { createContext, useContext, useState } from 'react';

type SheetType = 'none' | 'studentActions' | 'activities';

type SheetContextType = {
  sheetType: SheetType;
  openSheet: (type: SheetType) => void;
  closeSheet: () => void;
};

const SheetContext = createContext<SheetContextType | null>(null);

export function SheetProvider({ children }: { children: React.ReactNode }) {
  const [sheetType, setSheetType] = useState<SheetType>('none');

  const openSheet = (type: SheetType) => {
    setSheetType(type);
  };

  const closeSheet = () => {
    setSheetType('none');
  };

  return (
    <SheetContext.Provider value={{ sheetType, openSheet, closeSheet }}>
      {children}
    </SheetContext.Provider>
  );
}

export function useSheet() {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used inside SheetProvider');
  }
  return context;
}
