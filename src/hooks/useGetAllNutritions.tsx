// hooks/useNutritionLogs.js
import {useEffect} from 'react';
import {useAppStore} from '../store';
import {getAllNutritionLogs} from '../services/apis';
import {NotifyType} from '../types/index.d';

const useNutritionLogs = () => {
  const {setAllNutritions, setLoading, setNotification, nutritions, userId} =
    useAppStore();

  useEffect(() => {
    const fetchNutritionLogs = async () => {
      setLoading(true);

      try {
        const logs = await getAllNutritionLogs();
        logs && setAllNutritions(logs);
      } catch (error) {
        setNotification(NotifyType.Error, 'Fetching nutrition logs...');
      } finally {
        setLoading(false);
      }
    };

    if (userId && nutritions.length === 0) {
      fetchNutritionLogs();
    }
  }, [setAllNutritions, setLoading, setNotification, userId, nutritions]);
};

export default useNutritionLogs;
