### WELCOME TO THE DOC (Author: **a.emmanuel2@yahoo.com**)

This API gives you access to pretty much all the features you can use on mobile and web and lets you extend them for use in your application. It strives to be RESTful and is organized around the main resources you would be interacting with - with a few notable exceptions.

In this section, you'll find guides, resources and references.

**Error Codes**
___

Here is a comprehensive breakdown of all client and server-side errors that can occur during usage.

Error   | Error Message | Response Code | Description  |
---------- | :--------- | :--------- | :--------- |
mongoose castError   | Resource not found with id of resourse_id | 404| The specified resource does not exist, usually caused by typo
mongoose duplicate key| Duplicate filed value entered| 400 | The specified model or object in database does already exist
mongoose validation error| Validation Error occured| 400 | This occurs when a required field is not supplied
internal server error| Server Error| 500 | This happens when the server could not return any of the above error


**Common HTTP Response Code From This API**

As stated earlier, this API is RESTful and as such, uses conventional HTTP response codes to indicate the success or failure of requests.

Codes   | Description  |
---------- | :--------- |
200, 201   | Request was successful and intended action was carried out
400   | A validation or client-side error occurred and the request was not fulfilled.
404   | Request could not be fulfilled as the requested resource does not exist.
500, 501, 502, 503, 504   | Request could not be fulfilled due to an error on our API's end.


#### Keys

**success** (*boolean* ) | This indicates the outcome of the intended action that was carried out

**message** (*string*) | This indicates the description of the outcome of the intended action that was carried out

**data** (*array of object*) | This indicates the **payload** returned

**page** (*integer*) | This indicates the page number of the payload for pagination (post listing only)

**limit** (*integer*) | This indicates the limit of the payload (post listing only)



#### Quick Start
___

**Base URL**: https://pushengage.herokuapp.com

##### **Posts**
The Posts API allows you to do the following:
 - Create a new post
 - Fetches a list of posts
 - Fetches a single post
 - Fetches post's comments
 - Add Comments to a post
 - Add replies to a comment


**name:** Create a new post
**method:** Post
**end point:** {{base_url}}/api/v1/posts

Request Headers   |  Value |
---------- | :--------- |
Accept |  application/json
Content-Type |  application/json

Request Param   | Type| Description |
---------- | :--------- |:--------- |
title (*required*) | string | This indicates the title of the post
content (*required*) | string | This indicates the body of the post

**Sample Request**
```
{
  "title": "This is a test post",
  "content": "This is the body of the post"
}
```

**Sample Response**
```
 "success": true,
    "data": {
        "title": "My New Post",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "_id": "62504f007d68cfb2ac7c76f4",
        "createdAt": "2022-04-08T15:04:32.980Z",
        "__v": 0
    }
```

**name:** Get All Posts
**method:** Get
**end point:** {{base_url}}/api/v1/posts

Request Headers   |  Value |
---------- | :--------- |
Accept |  application/json
Content-Type |  application/json

Query Param   | Type| Description |
---------- | :--------- |:--------- |
page (*optional*) | string | This indicates the page number of the payload for pagination
limit (*optional*) | string | This indicates the limit of the payload


**Sample Request**
```
{{base_url}}/api/v1/posts?page=1&limit=10
```

**Sample Response**
```
"success": true,
    "message": "Posts retrieved successfully",
    "count": 1,
    "pagination": {
        "next": {
            "page": 2,
            "limit": 1
        },
        "links": {
            "current": "http://pushengage.herokuapp.com/api/v1/posts?page=1&limit=1",
            "first": "http://pushengage.herokuapp.com/api/v1/posts?page=1&limit=1",
            "next": "http://pushengage.herokuapp.com/api/v1/posts?page=2&limit=1",
            "last": "http://pushengage.herokuapp.com/api/v1/posts?page=3&limit=1"
        }
    },
    "data": [
        {
            "_id": "62504f007d68cfb2ac7c76f4",
            "title": "My New Post",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "createdAt": "2022-04-08T15:04:32.980Z",
            "__v": 0
        }
    ]
```

**name:** Get Single Post By Id
**method:** Get
**end point:** {{base_url}}/api/v1/posts/{postId}

Request Headers   |  Value |
---------- | :--------- |
Accept |  application/json
Content-Type |  application/json

**Sample Request**
```
{{base_url}}/api/v1/posts/5d713995b721c3bb38c1f5d0
```

**Sample Response**
```
"success": true,
    "message": "Post retrieved successfully",
    "data": {
        "post": {
            "_id": "5d713995b721c3bb38c1f5d0",
            "title": "Awsome Motive Mile Stone",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "createdAt": "2022-04-07T09:21:20.864Z",
            "__v": 0
        },
        "comments": [
            {
                "_id": "5b9f4f6b9f4f6a9f4f6a9fc0",
                "postId": "5d713995b721c3bb38c1f5d0",
                "comment": "ut sem viverra aliquet eget",
                "parentId": null,
                "children": [
                    "5b9f4f6b9f4f6a9f4f6a9fc1",
                    "5b9f4f6b9f4f6a9f4f6a9fc2",
                    "6250197df136b5eb0ed2a0de"
                ],
                "__v": 1
            },
            {
                "_id": "5b9f4f6b9f4f6a9f4f6a9fc5",
                "postId": "5d713995b721c3bb38c1f5d0",
                "comment": "ut sem viverra aliquet eget",
                "parentId": null,
                "children": [],
                "__v": 0
            },
            {
                "_id": "62501a0af136b5eb0ed2a0e3",
                "postId": "5d713995b721c3bb38c1f5d0",
                "comment": "A new comment",
                "parentId": null,
                "children": [],
                "__v": 0
            }
        ]
    }
```




**name:** Add Comment to a post
**method:** Post
**end point:** {{base_url}}/api/v1/posts/{postId}/comments

Request Headers   |  Value |
---------- | :--------- |
Accept |  application/json
Content-Type |  application/json

Request Param   | Type| Description |
---------- | :--------- |:--------- |
comment (*required*) | string | This indicates the comment to be added to the post
parentId (*optional*) | string | This used to determine if the comment is a reply to another comment or a direct comment to the post


**Sample Request**
```
{
	"comment": "A new comment",
	"parentId": null
}
```

**Sample Response**
```
"success": true,
    "message": "Comment added successfully",
    "data": {
        "postId": "5d713995b721c3bb38c1f5d0",
        "comment": "My comment with John",
        "parentId": null,
        "children": [],
        "_id": "62502d458dbd9a8406e34bd7",
        "__v": 0
    }
```


**name:** Add Reply to a comment
**method:** Post
**end point:** {{base_url}}/api/v1/posts/{postId}/comments

Request Headers   |  Value |
---------- | :--------- |
Accept |  application/json
Content-Type |  application/json

Request Param   | Type| Description |
---------- | :--------- |:--------- |
comment (*required*) | string | This indicates the comment to be added to the post
parentId (*optional*) | string | This used to determine if the comment is a reply to another comment or a direct comment to the post



**Sample Request**
```
{
	"comment": "A new comment",
	"parentId": "5d713995b721c3bb38c1f5d0"
}
```

**Sample Response**
```
"success": true,
    "message": "Comment added successfully",
    "data": {
        "postId": "5d713995b721c3bb38c1f5d0",
        "comment": "My comment with John",
        "parentId": null,
        "children": [],
        "_id": "62502d458dbd9a8406e34bd7",
        "__v": 0
    }
```



**name:** Fetch Comment or Comment's replies by comment ID
**method:** Get
**end point:** {{base_url}}/api/v1/posts/{postId}/comments/{commentId}

Request Headers   |  Value |
---------- | :--------- |
Accept |  application/json
Content-Type |  application/json

Query Param   | Type| Description |
---------- | :--------- |:--------- |
item (*optional*) | string | This determines whether to retrieve comment or replies

**Sample Request**
```
for replies set item to replies
{{base_url}}/api/v1/posts/5d713995b721c3bb38c1f5d0/comments/5b9f4f6b9f4f6a9f4f6a9fc0?item=replies

Otherwise do not set item

{{base_url}}/api/v1/posts/5d713995b721c3bb38c1f5d0/comments/5b9f4f6b9f4f6a9f4f6a9fc0

```

**Sample Response for replies**
```
"success": true,
	"message": "Comments retrieved successfully",
	"data": [
		{
			"_id": "5b9f4f6b9f4f6a9f4f6a9fc0",
			"postId": "5d713995b721c3bb38c1f5d0",
			"comment": "ut sem viverra aliquet eget",
			"parentId": null,
			"children": [
				"5b9f4f6b9f4f6a9f4f6a9fc1",
				"5b9f4f6b9f4f6a9f4f6a9fc2",
				"6250197df136b5eb0ed2a0de"
			],
			"__v": 1
		},
		{
			"_id": "5b9f4f6b9f4f6a9f4f6a9fc5",
			"postId": "5d713995b721c3bb38c1f5d0",
			"comment": "ut sem viverra aliquet eget",
			"parentId": null,
			"children": [],
			"__v": 0
		},
	]
```

### Pre-requisites
- Node.js
- Express.js
- MongoDB
- Mongoose

### Setup / Installation
- Clone this repo
- cd into config folder
- Touch a new file in the config folder and name it config.env (config/config.env)
- Copy the contents in config/config.env.example file and paste it in config/config.env
- Set your env variables
- cd into tests folder
- Go to line 8 in Posts.test.js and replace the file path with the path on your machine
- run ```npm install``` to install all the required dependencies
- run ```npm run dev``` to start the server
- run ```npm run test``` to run the test cases
- run ```node seeder -i``` to insert fake records into database
- run ```node seeder -d``` to destroy fake records from db
- run ```node seeder -c``` if you are not sure whether data are in already in db