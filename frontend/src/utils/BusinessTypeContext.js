import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getBusinessType, loadBusinessTypeId, saveBusinessTypeId } from './businessTypes';

const BusinessTypeContext = createContext(null);

export const BusinessTypeProvider = ({ children }) => {
  const [typeId, setTypeId] = useState(loadBusinessTypeId);

  const selectBusinessType = useCallback((id) => {
    saveBusinessTypeId(id);
    setTypeId(id);
  }, []);

  const value = useMemo(
    () => ({ businessType: getBusinessType(typeId), selectBusinessType }),
    [typeId, selectBusinessType]
  );

  return <BusinessTypeContext.Provider value={value}>{children}</BusinessTypeContext.Provider>;
};

// Returns { businessType, selectBusinessType }; businessType is undefined until one is chosen.
export const useBusinessType = () => {
  const context = useContext(BusinessTypeContext);
  if (!context) {
    throw new Error('useBusinessType must be used inside BusinessTypeProvider');
  }
  return context;
};
