import axios from 'axios';
// Common method for making GET requests
export const get = async (API, token) => {
  try {
    const response = await axios.get(API, {
		headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`,
	  }});
    return response.data;
  } catch (error) {
    console.error('GET Request Error:', error);
    throw error;
  }
};

export const getWithPagination = async (API, token,payload) => {
	console.log(API, token,payload)
	try {
	  const response = await axios.get(API, {
		//   data:{"page":page,
		//   "pageSize":"10"},
		params: payload,
		  headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`,
		}});
	  return response.data;
	} catch (error) {
	  console.error('GET Request Error:', error);
	  throw error;
	}
  };



export const put = async (API, token, payload) => {
	try {
	  const response = await axios.put(
		API,
		payload, // Pass payload directly as the second argument
		{
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		  },
		}
	  );
	  return response.data;
	} catch (error) {
	  console.error('PUT Request Error:', error);
	  throw error;
	}
  };

  export const putProfileUpdate = async (API, token, payload) => {
	try {
	  const formData =payload     //new FormData();
  
	//   // Append each key-value pair from payload to formData
	//   for (const key in payload) {
	// 	formData.append(key, payload[key]);
	//   }
      
	  console.log('formData---',formData,API)
	  const response = await axios.put(
		API,
		formData, // Pass formData instead of payload directly
		{
		  headers: {
			'Content-Type': 'multipart/form-data', // Use multipart/form-data for FormData
			Authorization: `Bearer ${token}`,
		  },
		}
	  );
  
	  return response.data;
	} catch (error) {
	  console.error('PUT Request Error:', error);
	  throw error;
	}
  };

  export const Delete = async (API, token) => {
	try {
	  const response = await axios.delete(
		API, // Pass payload directly as the second argument
		{
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		  },
		}
	  );
	  return response.data;
	} catch (error) {
	  console.error('PUT Request Error:', error);
	  throw error;
	}
  };


export const post = async(API,payload) => {

	const postBody = {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		// 'Authorization': `Bearer ${token}`,
	  },
	 body:JSON.stringify(payload),
	};
	console.log(API,' postBody', postBody);
	try {
		const response = await fetch(API, postBody);
		const result = await response.json();

		return result;
	  } catch (error) {
		console.error('Error in post request:', error);
		throw error;
	  }
  };

  export const ForgotPost = async (API, payload) => {
	const postBody = {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		// 'Authorization': `Bearer ${token}`,
	  },
	  body: JSON.stringify(payload),
	};
  
	try {
	  const response = await fetch(API, postBody);
	  const result = await response.json();
  
	  // Return both response status and result
	  return {
		status: response.status,
		data: result,
	  };
	} catch (error) {
	  console.error('Error in post request:', error);
	  throw error;
	}
  };

  export const inner_Post = async(API,token,payload) => {

	const postBody = {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`,
	  },
	 body:JSON.stringify(payload)
	};
	console.log(API,' postBody', postBody);
	try {
		const response = await fetch(API, postBody);
		const result = await response.json();

		return result;
	  } catch (error) {
		console.error('Error in post request:', error);
		throw error;
	  }
  };



export const fetchApiConfig = async (token) => {
	try {
	  const response = await fetch('https://templenode.allproject.online/config-API', {headers: {
		'Content-Type': 'application/json',
	  }});
	  const data = await response.json();
	  // Store configuration data in AsyncStorage
	//   await AsyncStorage.setItem('apiConfig', JSON.stringify(data));
	  return data;
	} catch (error) {
	  console.error('Error fetching API config:', error);
	  return null;
	}
  };
