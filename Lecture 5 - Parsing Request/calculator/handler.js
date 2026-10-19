const { sumRequestHandler } = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
      <head>
    <title>Calculator</title>
      </head>
      <body>
        <h1>Welcome to Calculator.</h1>
        <a href="/calculator">Go to Calculator</a>
      </body>
    </html>
  `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
      <head>
    <title>Calculator</title>
      </head>
      <body>
        <h1>Welcome to Calculator.</h1>
        <form action="/calculate-result" method="POST">
        <input type = "text" placeholder = "First Num" name = "first"/>
        <input type = "text" placeholder = "Second Num" name = "second"/>
        <input type = "submit" value = "sum"/>
        </form>
      </body>
    </html>`);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
      <head>
    <title>Calculator</title>
      </head>
      <body>
        <h1>Error 404.Page does not exist.</h1>
        <a href="/">Go to Home</a>
      </body>
    </html>
  `);
  return res.end();
};
exports.requestHandler = requestHandler;
