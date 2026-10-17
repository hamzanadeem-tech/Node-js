const fs = require("fs");

const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.method === "POST" && req.url === "/submit-details") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const ParsedBody = Buffer.concat(body).toString();
      console.log(ParsedBody);
      const params = new URLSearchParams(ParsedBody);
      const JsonObject = {};
      for (const [key, value] of params.entries()) {
        JsonObject[key] = value;
      }
      console.log(JsonObject);
      const JsonString = JSON.stringify(JsonObject);
      fs.writeFileSync("user-details.txt", JsonString);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Node Js</title></head>");

  if (req.url === "/") {
    res.write("<body>");
    res.write("<h1>Welcome to Home Page.</h1>");
    res.write('<form action="/submit-details" method="POST">');
    res.write(
      '<input type="text" id="name" name="name" placeholder="Enter Your Name"> <br><br>',
    );
    res.write(
      '<input type="radio" name="gender" value="male" checked> Male<br>',
    );
    res.write('<input type="radio" name="gender" value="female"> Female <br>');
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("</body></html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/products") {
    res.write("<body><h1>Welcome to products page</h1></body></html>");
    return res.end();
  }

  res.write("<body><h1>Welcome to default page.</h1></body>");
  res.write("</html>");
  return res.end();
};

module.exports = userRequestHandler;
