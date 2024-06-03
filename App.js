
import React,{useEffect} from "react";
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './src/Redux/Store';
import Navigation from "./src/navigation";
import i18n from "./src/i18n";
import Toast from "react-native-toast-message";


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    
  }, []);

  
  return (
    <Provider store={store}>
       <I18nextProvider i18n={i18n}>
      <Navigation />
      </I18nextProvider>
      <Toast/>
    </Provider>
  );



 
};
export default App;
