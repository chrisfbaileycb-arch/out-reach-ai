import { useCallback } from 'react';
import api from './api';
import { useAuth } from '../context/auth';
import { getBusinessType } from './businessTypes';

// The signed-in user's business type. It's saved on their account, so it follows
// them across devices and is gone after logout without any extra cleanup.
// businessType is undefined until one is chosen.
export const useBusinessType = () => {
  const { user, updateUser } = useAuth();

  // Resolves once saved; rejects (with the API error) if saving fails
  const selectBusinessType = useCallback(
    async (id) => {
      const res = await api.put('/api/business/me', { type: id });
      updateUser({ businessType: res.data.businessType });
    },
    [updateUser]
  );

  return { businessType: getBusinessType(user?.businessType), selectBusinessType };
};
