# API Documentation

## CRUD

*  Create
   *  Method: POST
   *  Endpoint: `/properties`
   *  Path params:
   *  Request body:
      ```javascript
      {
        address1: 'string',
        address2: 'string',
        city: 'string',
        states: 'string',
        zipcode: 'string',
        types: 'string',
        price: 'number',
      }
      ```
   *  Response object:
      HTTP Status 201
      ```javascript
      {
        _Id: 'string',
        address1: 'string',
        address2: 'string',
        city: 'string',
        states: 'string',
        zipcode: 'string',
        types: 'string',
        price: 'number',
      }
      ```

*  Read
   *  Method: GET
   *  Endpoint: `/properties/:propertyId/mortgages`
   *  Path params: `propertyId`
   *  Request body:
   *  Response object:
      HTTP Status 200
      ```javascript
      [
        {
            _Id: 'string',
            propertyId: 'string',
            userId: 'string',
            downPayment: 'string',
            loanProgram: 'string',
            interestRate: 'string',
            createdAt: 'string',
        },
        {
            _Id: 'string',
            propertyId: 'string',
            userId: 'string',
            downPayment: 'string',
            loanProgram: 'string',
            interestRate: 'string',
            createdAt: 'string',
        },
        .....
      ]
      ```

*  Update
   *  Method: PATCH
   *  Endpoint: `/users/:userId`
   *  Path params: `userId`
   *  Request body:
      ```javascript
      {
        _Id: 'string',
        phoneNumber: 'string',
      }
      ```
   *  Response object:
      HTTP Status 204
      ```javascript
      {
        _Id: 'string',
        lastName: 'string',
        firstName: 'string',
        email: 'string',
        phoneNumber: 'string',
      }
      ```

*  Delete
   *  Method: DELETE
   *  Endpoint: `/properties/:propertyId`
   *  Path params: `propertyId`
   *  Request body:
   *  Response object:
      HTTP Status 204
