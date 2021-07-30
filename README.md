FORMAT: 1A
HOST: http://waste-alert-api.herokuapp.com/

# Waste Alert API

Waste Alert API is a simple REST API allowing users to upload the location and image of uncontrolled garbage piles. 

### User Account

User must create an account or login to their existing account to upload their data.

### Upload Data

After creating or login to account an user can upload images of uncontrolled waste along with location.




## Create Account [/users]


### Create an User [POST] 

You may create your own account using this action. It takes a JSON
object containing users name, email and password.


+ Request (application/json)

        {
            "name": "Shahriar",
            "mail": "shahriarcse26@gmail.com",
            "password": "shahriar123!"
        }
        
        
+ Response 201 (application/json)

        [
            {
                "user": {
                        "completed": false,
                        "_id": "61024873c33f8b3758c7b43f",
                        "name": "Shahriar",
                        "email": "shahriarcse26@gmail.com",
                        "createdAt": "2021-07-29T06:19:31.712Z",
                        "updatedAt": "2021-07-29T06:19:31.934Z",
                        "__v": 1
                    },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTAyNDg3M2MzM2Y4YjM3NThjN2I0M2YiLCJpYXQiOjE2Mjc1Mzk1NzF9.O3BC6pZ8mS8k1_-LZLmlYR4sOdtRGCONbzCZ5MdfP2M"
            }
        ]

## Login to account [/users/login]
### Login User  [POST]

You may login to your account using previously created gmail and password

+ Request (application/json)

        {
            "mail": "shahriarcse26@gmail.com",
            "password": "shahriar123!"
        }

+ Response 200 (application/json)

        [
            {
                "user": {
                        "completed": false,
                        "_id": "61024873c33f8b3758c7b43f",
                        "name": "Shahriar",
                        "email": "shahriarcse26@gmail.com",
                        "createdAt": "2021-07-29T06:19:31.712Z",
                        "updatedAt": "2021-07-29T06:19:31.934Z",
                        "__v": 1
                    },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTAyNDg3M2MzM2Y4YjM3NThjN2I0M2YiLCJpYXQiOjE2Mjc1Mzk1NzF9.O3BC6pZ8mS8k1_-LZLmlYR4sOdtRGCONbzCZ5MdfP2M"
            }
        ]
        
## Login to account [/users/logout]
### Logout User  [POST]

You may logout from your account using /logout route

+ Response 200 (application/json)

        [
            {
                "message": "User logged out successfully"
            }
        ]

## Read User Profile [/users/me]

You may read, update and delete your account using this route
### User Profile  [GET]

+ Response 200 (application/json)

        [
            {
                "_id": "61024873c33f8b3758c7b43f",
                "name": "Shahriar",
                "email": "shahriarcse26@gmail.com",
                "createdAt": "2021-07-29T06:19:31.712Z",
                "updatedAt": "2021-07-29T06:19:31.934Z",
                "__v": 1
            }
        ]
        
### Update Profile  [PATCH]

+ Request (application/json)

        {
            "email": "shahriar.cse@gmail.com"
        }


+ Response 200 (application/json)

        [
            {
                "_id": "61024873c33f8b3758c7b43f",
                "name": "Shahriar",
                "email": "shahriar.cse@gmail.com",
                "createdAt": "2021-07-29T06:19:31.712Z",
                "updatedAt": "2021-07-29T06:19:31.934Z",
                "__v": 1
            }
        ]

### Delete Profile  [DELETE]


+ Response 200 (application/json)

        [
            {
                "_id": "61024873c33f8b3758c7b43f",
                "name": "Shahriar",
                "email": "shahriar.cse@gmail.com",
                "createdAt": "2021-07-29T06:19:31.712Z",
                "updatedAt": "2021-07-29T06:19:31.934Z",
                "__v": 1
            }
        ]

## Data Handler [/datas]
### Upload Data  [POST]

+ Request (multipart/form-data; boundary=---BOUNDARY)

        -----BOUNDARY
        Content-Disposition: form-data; name="image[file]"; filename="image.jpg"
        Content-Type: image/jpg
        -----BOUNDARY
        {
            "wasteType": "organic",
            "location" : {
                "lat": 46.987,
                "long": -54.345
            }
        }


+ Response 200 (application/json)

        [
            {
                "_id": "61041a33d8e95d2878cf5fed",
                "wasteType": "organic",
                "location": {
                    "lat": 46.987,
                    "long": -54.345
                },
                "image": "http://localhost:3000/uploads/image.jpg-1627658803811.jpeg",
                "owner": "610406f502497d43b8b77cb9",
                "createdAt": "2021-07-30T15:26:43.828Z",
                "updatedAt": "2021-07-30T15:26:43.828Z",
                "__v": 0
            }
        ]

### Read Datas [GET]
Using this route, user will get all the data uploaded by users

+ Response 200 (application/json)

        [
            {
                "_id": "61024873c33f8b3758c7b43f",
                "name": "Shahriar",
                "email": "shahriarcse26@gmail.com",
                "createdAt": "2021-07-29T06:19:31.712Z",
                "updatedAt": "2021-07-29T06:19:31.934Z",
                "__v": 1
            }
        ]
        
## Data Control [/datas/:id]

You may read, update and delete your account using this route
### Read data  [GET]

+ Response 200 (application/json)

        [
            {
                "_id": "61041a33d8e95d2878cf5fed",
                "wasteType": "organic",
                "location": {
                    "lat": 46.987,
                    "long": -54.345
                },
                "image": "http://localhost:3000/uploads/image.jpg-1627658803811.jpeg",
                "owner": "610406f502497d43b8b77cb9",
                "createdAt": "2021-07-30T15:26:43.828Z",
                "updatedAt": "2021-07-30T15:26:43.828Z",
                "__v": 0
            }
        ]
        
### Update Data  [PATCH]

+ Request (application/json)

        {
            "wasteType": "Toxic"
        }


+ Response 200 (application/json)

        [
            {
                "_id": "61041a33d8e95d2878cf5fed",
                "wasteType": "Toxic",
                "location": {
                    "lat": 46.987,
                    "long": -54.345
                },
                "image": "http://localhost:3000/uploads/image.jpg-1627658803811.jpeg",
                "owner": "610406f502497d43b8b77cb9",
                "createdAt": "2021-07-30T15:26:43.828Z",
                "updatedAt": "2021-07-30T15:26:43.828Z",
                "__v": 0
            }
        ]

### Delete Data  [DELETE]


+ Response 200 (application/json)

        [
            {
                "_id": "61041a33d8e95d2878cf5fed",
                "wasteType": "Toxic",
                "location": {
                    "lat": 46.987,
                    "long": -54.345
                },
                "image": "http://localhost:3000/uploads/image.jpg-1627658803811.jpeg",
                "owner": "610406f502497d43b8b77cb9",
                "createdAt": "2021-07-30T15:26:43.828Z",
                "updatedAt": "2021-07-30T15:26:43.828Z",
                "__v": 0
            }
        ]
