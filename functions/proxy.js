const axios = require('axios');

exports.handler = async (event, context) => {
  const baseUrl = 'http://odaidelivery.atwebpages.com';
  const path = event.path.replace('/.netlify/functions/proxy', '');
  const url = `${baseUrl}${path}`;

  try {
    const response = await axios({
      method: event.httpMethod,
      url: url,
      data: event.body,
      headers: {
        'Content-Type': event.headers['content-type'],
      },
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
