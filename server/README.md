## Ten Thousand Small Steps Server


### Endpoints

#### Login

* Payload

  ```sh
  {
        email: 'test@email.com',
        password: 'fytKMvpcEri9Uqd',
  }
  ```

* 200 Result

  ```sh
  {
        success: true,
        token: token,
        userCredentials: user
  }
  ```
* 400 Result

  ```sh
  {
        types: "Not Found",
        msg: "Wrong Login Details"
  }
  ```

* 500 Result

  ```sh
  {
        type: "AHH Something Went Wrong!",
        msg: err
  }
  ```

  


