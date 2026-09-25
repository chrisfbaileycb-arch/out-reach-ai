import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  getBusinessType,
  loadBusinessTypeId,
  saveBusinessTypeId,
  clearBusinessTypeId,
} from './businessTypes';

const BusinessTypeContext = createContext(null);

export const BusinessTypeProvider = ({ children }) => {
  const [typeId, setTypeId] = useState(loadBusinessTypeId);

  const selectBusinessType = useCallback((id) => {
    saveBusinessTypeId(id);
    setTypeId(id);
  }, []);

  const clearBusinessType = useCallback(() => {
    clearBusinessTypeId();
    setTypeId(null);
  }, []);

  const value = useMemo(
    () => ({ businessType: getBusinessType(typeId), selectBusinessType, clearBusinessType }),
    [typeId, selectBusinessType, clearBusinessType]
  );

  return <BusinessTypeContext.Provider value={value}>{children}</BusinessTypeContext.Provider>;
};

// Returns { businessType, selectBusinessType, clearBusinessType }; businessType is undefined until one is chosen.
export const useBusinessType = () => {
  const context = useContext(BusinessTypeContext);
  if (!context) {
    throw new Error('useBusinessType must be used inside BusinessTypeProvider');
  }
  return context;
};
