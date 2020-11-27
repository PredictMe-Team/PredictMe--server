# PredictMe--server

## 1.User Register
* URL
  /register

* Method
 `POST`

* URL Params
  None

* Data Params

```{
  "name": "name",
  "email": "email",
  "password": "password"
},
{
headers:{access_token}
}
```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  {
    "id": "id",
    "name": "name",
    "email": "email",
  },
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  {
    msg: 'Internal Server Error'
  }
  ```

## 2.User Login
* URL
  /Login

* Method
 `POST`

* URL Params
  None

* Data Params

```{
  "email": "email"
  "password": "password"
},

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  {
    "access_token" : "createToken"
  }
  ```

* Error Response
  code: `404 Authentication Failed`
  content:
  ```
  {
    msg: `Invalid Account
  }
  ```

  code: `404 Authentication Failed`
  content:
  ```
  {
    msg: `Invalid email or password
  }
  ```

  code: `500 Internal Server Error`
  content:
  ```
  {
    msg: `Internal server error`
  }
  ```

## 3. Predict API
* URL
  /Predict

* Method
 `POST`

* URL Params
  None

* Data Params

```{
  "name": "name"
},
{
headers:{access_token}
}
```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  {
    "country": "countryname",
    "age": "result.data.age",
    "gender": "result.data.gender",
    "url": "img_url"
  }
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  {
    err
  }
  ```


## 4. Oath
* URL
  /googleLogin

* Method
 `POST`

* URL Params
  None

* Data Params

```{
  GoogleAccount
},
```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  {
    "access_token": "createToken"
  }
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  {
    msg: "Internal Server Error"
  }
  ```

