import Toast from 'react-native-toast-message';
import { API_Token as initialAPIToken } from '../services/config';
import { format,formatDistanceToNow } from 'date-fns';



export const formatDate = isoDate => {
  if (isoDate !== undefined || isoDate!=='' || isoDate!==null) {
    return format(new Date(isoDate), 'MM/dd/yyyy');  
  }
 return null
};

// Output: "4 hours ago"
export const formatTimeForNow=(createdAt)=>{
return  formatDistanceToNow(new Date(createdAt), { addSuffix: true });
}


export const getTimeFromDate = (isoDate) => {
  if (isoDate !== undefined || isoDate!=='' || isoDate!==null) {
   // Parse the date string into a Date object
   const date = new Date(isoDate);
  
   // Format the time using the 'hh:mm a' format
   const time = format(date, 'hh:mm a');
 
   return time;
  }
 return null

};



export const showToast = (type, text) => {
  Toast.show({
    type: type,
    text1: text,
    position: 'top',
  });
};


export const getImageFullPath = (imagebasePath,imageName) => {
  // console.log(imagebasePath+imageName)
  if(imageName)
 { 
  return {uri:`${imagebasePath}${imageName}`}
}
};

export const debounce = (func, delay) => {
  let timeoutId;

  return function(...args) {
    const context = this;

    clearTimeout(timeoutId);

    if (typeof func === 'function') {
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    }
  };
};

let myGlobalIsNotificationRead = false;

export const getIsNotification =()=>{
return myGlobalIsNotificationRead
} ;

export const setgetIsNotification=(param)=>{
  myGlobalIsNotificationRead=param
}