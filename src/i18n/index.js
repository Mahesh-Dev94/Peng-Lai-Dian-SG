import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {setLanguage} from '../Redux/Reducers/languageSlice';

import enTranslation from './en.json';
import zhTranslation from './zh.json';

import {useEffect} from 'react';

const STORE_LANGUAGE_KEY = 'settings.lang'; // Define the key for storing language in AsyncStorage

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: enTranslation},
    zh: {translation: zhTranslation},
  },
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export const useLocale = () => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.selectedLanguage);

  // Read language from AsyncStorage on component mount
  useEffect(() => {
    const getStoredLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
        console.log('storedLanguage------',storedLanguage)
        if (storedLanguage) {
          dispatch(setLanguage(storedLanguage)); // Dispatch Redux action to set language
          i18n.changeLanguage(storedLanguage); // Change language in i18n
        }
      } catch (error) {
        console.error('Error reading language from AsyncStorage:', error);
      }
    };

    getStoredLanguage();

    return () => {
      // Cleanup
    };
  }, [dispatch]);

  const changeLanguage = async lng => {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, lng); // Save selected language to AsyncStorage
      dispatch(setLanguage(lng)); // Dispatch Redux action to set language
      i18n.changeLanguage(lng); // Change language in i18n
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  };

  return {language, changeLanguage};
};

export default i18n;
