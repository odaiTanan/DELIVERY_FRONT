const axios = require('axios');
const formidable = require('formidable');

exports.handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/proxy', '');
  const baseUrl = 'http://odaidelivery.atwebpages.com';
  const url = `${baseUrl}${path}`;

  try {
   
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

   
    const response = await axios({
      method: event.httpMethod,
      url: url,
      data: formData.fields,
     
    });


    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {

    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
