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

## 3. Get Nationality
* URL
  /Predict

* Method
 `GET`

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
  Code: `201 Created`
  Content: 
  ```
  {
    "country": "countryname"
  }
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  {
    "country": "random country"
  }
  ```

## 4. Get Age
* URL
  /Predict

* Method
 `GET`

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
  Code: `201 Created`
  Content: 
  ```
  {
    "age": "result.data.age"
  }
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  {
    "age": "random age"
  }
  ```

## 5. Get Gender
* URL
  /Predict

* Method
 `GET`

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
  Code: `201 Created`
  Content: 
  ```
  {
    "gender": "result.data.gender"
  }
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  {
    "gender": "random gender"
  }
  ```
## 6. Get cat pictures
* URL
  /Predict

* Method
 `GET`

* URL Params
  None

* Data Params

  none


* Success Response
  Code: `201 Created`
  Content: 
  ```
  {
     "url": "img_url"
  }
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  {
    "url": "img_url"
  }
  ```

  ## 6. Oath
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
  Code: `201 Created`
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

