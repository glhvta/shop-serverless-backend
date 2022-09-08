# Product service

Product Service created with API Gateway and Lambdas
## Front-End Application

https://d3jv20c7ho3whs.cloudfront.net/

## Product service

All Products: `/products`  
   - https://bta8xv58vl.execute-api.eu-central-1.amazonaws.com/dev/products
   - method: GET

Product By Id: `/products/{productId}`
   - https://bta8xv58vl.execute-api.eu-central-1.amazonaws.com/dev/products/{productId}
   - method: GET

Example:
   - Product 200 response:   
   https://bta8xv58vl.execute-api.eu-central-1.amazonaws.com/dev/products/7567ec4b-b10c-45c5-9345-fc73c48a80a1
   - 404 Error:   
   https://bta8xv58vl.execute-api.eu-central-1.amazonaws.com/dev/products/random

