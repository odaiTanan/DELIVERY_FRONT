const axios = require('axios');
const formidable = require('formidable');

exports.handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/proxy', '');
  const baseUrl = 'http://odaidelivery.atwebpages.com';
  const url = `${baseUrl}${path}`;

  try {
    // تحليل FormData
    const form = new formidable.IncomingForm();
    const formData = await new Promise((resolve, reject) => {
      form.parse(event.body, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    // إرسال البيانات إلى الخادم النهائي باستخدام axios
    const response = await axios({
      method: event.httpMethod,
      url: url,
      data: formData.fields, // إرسال الحقول (fields) فقط
      headers: {
        'Content-Type': 'application/json', // يمكنك تغيير هذا حسب ما يتوقعه الخادم النهائي
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
