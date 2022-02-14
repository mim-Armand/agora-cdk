


const responseTemplate =
  (statusCode = 200 , body = {msg: "All good!"}, contentType = "application/json", headers = {}) => ({
    statusCode,
    headers: {"content-type": contentType, 'Access-Control-Allow-Origin': '*', ...headers},
    body: typeof(body) === 'string' ?  body : JSON.stringify(body)
  })

module.exports = { responseTemplate }