exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'DONG',
      age: 22,
      email: 'tlzma789@naver.com'
    })
  }
};