const axios = require('axios');
exports.handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/proxy', '');
  const baseUrl = 'http://odaidelivery.atwebpages.com';
  const url = `${baseUrl}${path}`;
  const formData=new FormData()
  formData.append(email:"odai@gmail.com")
  formData.append(password:"Odaitanan11")
  try {
    const response = await axios({
      method: event.httpMethod,
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // إرجاع البيانات كـ JSON
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // إرجاع خطأ إذا فشل الطلب
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
