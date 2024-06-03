# Backend API Documentation 🧑‍💻

## API URL 🔗

[UlikBatik API]

```http
  http://localhost:8080/
```

## How to run this API on your local machine 💻

If you want to run this API Server on your local machine, you need to do this steps:

- First, clone this repository. `git clone https://github.com/UlikBatik/cloud-computing-backend.git`
- Second, open terminal and go to this project's root directory.
- Third, type `npm ci` in your terminal and hit enter button.
- Fourth, start xampp.
- fifth, create database name `ulikbatik-dev`.
- sixth, type `npx prisma generate` in your terminal and hit enter button.	
- seventh, type `npx prisma migrate dev` in your terminal and hit enter button.
- eighth, type `npm run start-dev` in your terminal and hit enter button.
- Finally, the server will run on your http://localhost:8080

# API Endpoints

## Auth Endpoints
### Register

```http
  POST /register
```
Register account for user

| Parameter         | Type     | Description   |
| :------------------ | :--------- | :-------------- |
| `username`        | `string` | **Required**. |
| `email`           | `string` | **Required**. |
| `password`        | `string` | **Required**. |
| `confirmpassword` | `string` | **Required**. |

#### Response

```http
  }
  "status": "true",
  "message": "Account created successfully",
   "data": {
        "USERID": ,
        "USERNAME": ,
        "EMAIL": ,
        "PASSWORD": ,
        "PROFILEIMG": ,
        "CREATEDAT":,
        "UPDATEDAT": 
    },
    "token": 
   }
```
### Login
Login for user

```http
  POST /login
```
| Parameter         | Type     | Description   |
| :------------------ | :--------- | :-------------- |
| `email`           | `string` | **Required**. |
| `password`        | `string` | **Required**. |

#### Response
```http
  }
  "status": "true",
  "message": "Login successful",
   "data": {

    },
    "token": 
   }
```
## User Endpoint
### Get User by ID
Get Profile User by ID

```http
  GET /user{USERID}
```
#### Authorization
bearer token: token

#### Response
```http
    }
  "status": true,
    "message": "Fetching user profile successful",
	  "data":{
	   "USERNAME":,
		 "EMAIL" :,
		 "PROFILEIMG":
		  "post":[
		  {
		  "POSTID": ,   
		  "USERID":,    
		  "BATIKID":,    
		  "POSTIMG":,    
		  "CAPTION": ,   
		  "LIKES":,      
		  "CREATEDAT": ,
		  "UPDATEDAT": 
		  }
		  ],
		  "likes":sumOf(user id in table likes) INTEGER,
		  "total_post" :sumOf(user posts) INTEGER
	  }
   }
```

### Update Profile
Update profile user by ID

```http
  GET /user{USERID}
```

| Parameter         | Type     | Description   |
| :------------------ | :--------- | :-------------- |
| `IMAGE`           | `file` | **optional**. |
| `USERNAME`           | `string` | **optional**. |

#### Authorization
bearer token: token

#### Response
```http
    }
   "status": true,
    "message": "Update user profile successful",
    }
```
## Post Endpoint
### Make Post
Posting new post

```http
 POST /post
```
| Parameter         | Type     | Description   |
| :------------------ | :--------- | :-------------- |
| `IMAGE`           | `file` | **required**. |
| `CAPTION`           | `string` | **required**. |
| `USERID`           | `string` | **required**. |
| `BATIKID`           | `string` | **required**. |

#### Authorization
bearer token: token

#### Response
```http
    }
   "status": true,
    "message": "Posting successful",
    "POSTID":,
    }
```
### Get Post
Get all post data in database

```http
  GET /posts
```

#### Authorization
bearer token: token

#### Response
```http
    }
   "status": true,
    "message": "Fetching posts successful",
	  "data":[
		  {
		  "POSTID": ,   
		  "USERID":,    
		  "BATIKID":,    
		  "POSTIMG":,    
		  "CAPTION":    
		  "LIKES":sumOf(likes post in table likes),      
		  "CREATEDAT":  
		  "UPDATEDAT":  
		  },
	  ]
      }
```

### Get post by ID
Get post by ID

```http
  GET /post/{POSTID}
```


#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "Fetching post successful",
	  "data":{
		  "POSTID": ,   
		  "USERID":,    
		  "BATIKID":,    
		  "POSTIMG":,    
		  "CAPTION": ,
		  "Likes":,        
		  "CREATEDAT": , 
		  "UPDATEDAT":
		  "Batik":{   
			  "BATIKNAME" :, 
			  "BATIKDESC" :,
			  "BATIKIMG" :  
			  }
			"User":{
			 "USERNAME":,  
			 "EMAIL":,      
			 "PASSWORD":,   
			 "PROFILEIMG": 
			 }   
		}
    }
```

### Get post by Batik ID
Get post by Batik ID

```http
  GET /posts/{BATIKID}
```

#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "Fetching post successful",
	  "data":{
		  "POSTID": ,   
		  "USERID":,    
		  "BATIKID":,    
		  "POSTIMG":,    
		  "CAPTION": ,
		  "Likes":,        
		  "CREATEDAT": , 
		  "UPDATEDAT":
		  "Batik":{   
			  "BATIKNAME" :, 
			  "BATIKDESC" :,
			  "BATIKIMG" :  
			  }
			"User":{
			 "USERNAME":,  
			 "EMAIL":,      
			 "PASSWORD":,   
			 "PROFILEIMG": 
			 }   
		},
    }
```
### Delete post
Delete post by post ID

```http
  DELETE /post/{POSTID}
```

#### Authorization
bearer token: token

#### Response
```http
    }
        {
            "status": true,
            "message": " Post deleted successful"
        }
    }
```
## Likes Endpoint
### Likes 
Likes post by POSTID and USERID
```http
  POST /likes/{USERID}
```
| Parameter         | Type     | Description   |
| :------------------ | :--------- | :-------------- |
| `POSTID`           | `string` | **required**. |

#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "likes post successful"
    }
```
if same USERID hit likes endpoint with same POSTID twice it will unlike the post
#### Response
```http
    }
    "status": true,
    "message": "Post unliked successfully"
    }
```

### Get likes 
Get all user likes by USERID
```http
  GET /likes/{USERID}
```

#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "Fetching user likes successful",
	  "data":[
		   "USERID":,
			 "posts":[
				 {
			 "POSTID": ,   
			 "USERID":,    
			 "BATIKID":,    
			 "POSTIMG":,    
			 "CAPTION":    
			 "LIKES":,      
			 "CREATEDAT":  
			 "UPDATEDAT":
				 }
			 ],
	  ]
    }
```
## Batik Endpoint
### Search Batik 
Search batik using query param dinamis
```http
  GET /batiks/search?q={query}
```
| Parameter         | Type     | Description   |
| :------------------ | :--------- | :-------------- |
| `query`           | `string` | **required**. |

#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "Fetching batik successful",
	  "data":[
		  {
		   "BATIKID":   
			 "BATIKNAME":  
			 "BATIKDESC":  
			 "BATIKIMG":   
		  },
	  ]
    }
```
### Get All Batik
Get all batik data in database
```http
  GET /batiks
```
#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "Fetching batik successful",
	  "data":[
		  {
		   "BATIKID":   
			 "BATIKNAME":  
			 "BATIKDESC":  
			 "BATIKIMG":   
		  },
	  ]
    }
```
### Get Batik by BATIKID
Get  batik data by BATIKID
```http
  GET /batik/{BATIKID}
```
#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "Fetching batik successful",
	  "data":[
		  {
		   "BATIKID":   
			 "BATIKNAME":  
			 "BATIKDESC":  
			 "BATIKIMG":   
		  },
	  ]
    }
```

## Machine Learning Model Endpoint
### Scan Batik
Scan batik image and analyze batik pattern
```http
  POST /predict
```
| Parameter         | Type     | Description   |
| :------------------ | :--------- | :-------------- |
| `attactment`           | `file` | **required**. |

#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "Scan successful",
    "result":,
    }
```

## Matahari API
### Search Batik Product
Search batik product by name in matahari website
```http
  POST /search/{query}
```
| Parameter         | Type     | Description   |
| :------------------ | :--------- | :-------------- |
| `query`           | `string` | **required**. |

#### Authorization
bearer token: token

#### Response
```http
    }
    "status": true,
    "message": "Data retrieved sucessfully",
	  "result":[
		  {
		  "link": ,   
		  "image":,    
		  "title":,    
		  "price":,    
		  },
	  ]
    }
```

