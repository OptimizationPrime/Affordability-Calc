# API Documentation

*  Create
   *  Method: POST
   *  Endpoint: `/properties`
   *  Path params:
   *  Request body:
      ```javascript
      {
          "id" : "Number",
          "mortgage" : {
              "price" : "Number"
          }
      }
      ```
   *  Response object:
      HTTP Status 201
      ```javascript
      {
          "id" : "Number",
          "mortgage" : {
              "price" : "Number"
          }
      }
      ```

*  Read
   *  Method: GET
   *  Endpoint: `/properties/:propertyId`
   *  Path params: `propertyId`
   *  Request body:
   *  Response object:
      HTTP Status 200
      ```javascript
      {
          "id" : "Number",
          "mortgage" : {
              "price" : "Number"
          }
      }
      ```
      
*  Update
   *  Method: PATCH
   *  Endpoint: `/properties/:propertyId`
   *  Path params: `propertyId`
   *  Request body:
      ```javascript
      {
          "id" : "Number",
          "mortgage" : {
              "price" : "Number"
          }
      }
      ```
   *  Response object:
      HTTP Status 204
      ```javascript
      {
          "id" : "Number",
          "mortgage" : {
              "price" : "Number"
          }
      }
      ```
      
*  Delete
   *  Method: DELETE
   *  Endpoint: `/properties/:propertyId`
   *  Path params: `propertyId`
   *  Request body:
   *  Response object:
      HTTP Status 204
      ```javascript
      { 
          n: 1, 
          ok: 1 
      }
      ```
 
