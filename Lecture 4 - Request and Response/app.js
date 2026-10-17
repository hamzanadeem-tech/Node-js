const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.method === "POST" && req.url === "/submit-details") {
    req.on("data", (chunk) => {
      console.log(chunk);
    });

    fs.writeFileSync("user-details.txt", "Prashant Jain");
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
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
