# URl Encoded
The app.use(express.urlencoded({ extended: true })) middleware in Express is used to parse incoming requests with URL-encoded payloads, which typically come from HTML forms. Here’s why we use it and what it does:

Parses URL-Encoded Data: express.urlencoded() middleware extracts data encoded in the URL format (like key=value&key2=value2) from the request body. It then converts this data into a JavaScript object and assigns it to req.body, similar to express.json() but specifically for URL-encoded data.

Supports HTML Form Submissions: When a user submits a form from a webpage with a POST method and Content-Type: application/x-www-form-urlencoded, this middleware helps process that form data easily on the server.

Extended Option: The { extended: true } option allows for richer objects to be encoded in the URL-encoded format using the querystring library. Here’s what each option means:

{ extended: true }: Allows for nested objects and more complex data structures using the qs library.
{ extended: false }: Uses the built-in querystring library to parse data, supporting only simple key-value pairs.

# Json()
We use app.use(express.json()) in an Express application to parse incoming JSON-formatted request bodies. This middleware is essential when your application expects to handle data sent in JSON format (usually via POST, PUT, or PATCH requests) from the client to the server. Here’s what it does and why it’s useful:

Parses JSON Payloads: express.json() middleware extracts JSON data from incoming requests and automatically converts it into a JavaScript object. This allows you to access the data through req.body without manually parsing it.

Simplifies Handling of JSON Data: When you receive JSON data in the body of a request, you can directly interact with req.body to retrieve or manipulate data, making development more convenient and less error-prone.

Supports REST APIs: Many APIs use JSON as the standard data format. Adding express.json() enables your Express app to handle JSON payloads easily, making it essential for building RESTful APIs.