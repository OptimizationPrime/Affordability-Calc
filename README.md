# API Documentation

*  Create
   *  Method: POST
   *  Endpoint: `/mortgage/prices`
   *  Path params:
   *  Request body:
      ```javascript
      {
          "id" : "Number",
          "homePrice" : "Number",
      }
      ```
   *  Response object:
      HTTP Status 201
      ```javascript
      {
          "_id" : "String",
          "id" : "Number",
          "homePrice" : "Number",
          "__v" : "Number"
      }
      ```

*  Read
   *  Method: GET
   *  Endpoint: `/mortgage/prices/:propertyId`
   *  Path params: `propertyId`
   *  Request body:
   *  Response object:
      HTTP Status 200
      ```javascript
      {
          "_id" : "String",
          "id" : "Number",
          "homePrice" : "Number",
          "__v" : "Number"
      }
      ```
      
*  Update
   *  Method: PUT
   *  Endpoint: `/mortgage/prices/:propertyId`
   *  Path params: `propertyId`
   *  Request body:
      ```javascript
      {
          "homePrice" : "Number",
      }
      ```
   *  Response object:
      HTTP Status 204
      ```javascript
      {
          "_id" : "String",
          "id" : "Number",
          "homePrice" : "Number",
          "__v" : "Number"
      }
      ```
      
*  Delete
   *  Method: DELETE
   *  Endpoint: `/mortgage/prices/:propertyId`
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
 
