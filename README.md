# API Documentation

*  Create
   *  Method: POST
   *  Endpoint: `/mortgage/prices`
   *  Path params:
   *  Request body:
      ```javascript
      {
          "id" : 111,
          "homePrice" : 111111,
      }
      ```
   *  Response object:
      HTTP Status 201
      ```javascript
      {
          "_id" : ObjectId("5fc6edded90388a631148601"),
          "id" : 111,
          "homePrice" : 111111,
          "__v" : 0
      }
      ```

*  Read
   *  Method: GET
   *  Endpoint: `/mortgage/prices/:propertyId`
   *  Path params: `req.params.propertyId`
   *  Request body:
   *  Response object:
      HTTP Status 200
      ```javascript
      {
          "_id" : ObjectId("5fc6edded90388a631148601"),
          "id" : 111,
          "homePrice" : 111111,
          "__v" : 0
      }
      ```
      
*  Update
   *  Method: PUT
   *  Endpoint: `/mortgage/prices/:propertyId`
   *  Path params: `req.params.propertyId`
   *  Request body:
      ```javascript
      {
          "homePrice" : 222222,
      }
      ```
   *  Response object:
      HTTP Status 200
      ```javascript
      {
          "_id" : ObjectId("5fc6edded90388a631148601"),
          "id" : 111,
          "homePrice" : 222222,
          "__v" : 0
      }
      ```
      
*  Delete
   *  Method: DELETE
   *  Endpoint: /mortgage/prices/:propertyId
   *  Path params: req.params.propertyId
   *  Request body:
   *  Response object:
      HTTP Status 200
      ```javascript
      { 
          n: 1, 
          ok: 1 
      }
      ```
 
