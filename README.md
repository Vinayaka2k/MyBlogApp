# MyBlogApp

## Components

## App
Routes the path to the appropriate components
#### "/"                 `<Home />`
#### "/blogs"            `<Blogs/>`
#### "/blog/:id"         `<Blog />`
#### "/signup"           `<Signup />`
#### "/login"            `<Login />`
#### "/me"               `<Profile />`
#### "/post"             `<Post />`
#### "/blog/:id/edit"    `<Edit />`
#### "/admin"            `<Admin />`

### Home
Gets the latest blog created and sets the state to the fetched blog. If a blog exists, renders the `BlogCard` component with the appropriate title, desc and content. Until the blog gets fetched, a loading message is displayed. In case the user is not logged in, a login link is displayed after which the user would be able to post new blogs

### Blogs
Fetches a list of all blogs in the useEffect hook by making a call to the endpoint `/blogs` and sets the state to the fetched list. returns a list of `BlogCards` by passing the content, desc and thumbnail to the individual `BlogCard`   

### Post
Used to post a new blog. Multiple states are created for blog items like content, desc, thumbnail, etc. A basic form is displayed for the user to enter all the blog details and the above state values are updated on every change of the input fields. on submit, `setLoading` is set to true and a post request is made to the endpoint `/api/post`. And `useBearer` hook is used to provide the authToken to authenticate the current user. Once the blog has been posted, `useNaviagte` hook is used to naviagte to the newly created blog `/blog/:id`

### Blog
Used to display a single blog. `useLocation` hook is used to get the current id and a post request to `/api/blog/:id` is made in the useEffect hook by getting the authToken using the `useBearer` hook. All the blog details like title, thumbnail, etc are set on receipt of a response and are rednered appropriatly
 
### Profile
Displays the username and the role first. Then, using a `BlogCard`, both public and private blogs of the user are displayed. `useUid` and `useUsername` are used to fetch the userId and the userName. `useBearer` hook is used to refresh the current token. Further, the list of blogs of the current user are fetched in the useEffect hook by my making a request to `/api/blogs`.

### Login
Input elements for username and password and a submit button are displayed on click of which a handler is invoked. In the handler, a post request to `/auth/login` is done and username and password are sent and on receiving the response, the authTokens and refreshTokens are saved to the localStorage

### Signup
Input elements for username, password and confirm password are displayed. And a submit button is displayed onClick of which the handler is invoked. In the handler, a post request to `/auth/signup` is done with username, password and confPassword passed in the body of the request. Finally, a 201 response is received, the browser navigates to `/login` using the `useNavigate` hook.

### Admin
Displays a list of userCards for each user fetched in the useEffect hook by making a request to `/auth/users` by passing a Authorization header using `useBearer`.

### Edit
Used to edit and save an existing blog. First, a request is made to `/api/blog/:id` to get the current blog to be edited. On receiving a response, the input elements of the UI are populated. On click of the submit button in the form, a handler is invoked in which a PATCH API request is made to `/api/blog/:id` along with the updated blog details. Once the response is received, the browser navigates to `/blog/id` using a `useNavigate` hook.


## Pseudo Components

### BlogCard
Displays the thumbnail and title of the blog in a card. Clicking the card redirects to `/blog/id`.

### Nav
Displays the navBar and redirects to different pages when clicked. Logout, Profile and Post pages navBtns are displayed only when user is authenicated. Admin navBtn is displayed only when the logged in user is an admin. Similarly, Login is displayed only when the user is not logged in.

## Custom Hooks
Custom hooks are re-usable functions that can imported and reused inside any component

### useAuth
Checks if the user is logged in by accessing the tokens from the localStorage. If no tokens are found, retuns false. If any token found and the token is not expired, returns true. Else if the token has expired, returns false.

### useAdmin
Checks if the role of the logged in user is admin. If yes, return true else return false.

### useReset
Delete both the authToken and refreshToken to log the user out

### useBearer
Gets the access and refresh Tokens from the localStorage. If the tokens are not present, return false. Else if the tokens are present and the tokens have not expired, posts a request to `/auth/token` to refresh the token and returns the token in the form of `Bearer <token>`. Else if the tokens have been expired, returns false.

### useUid
Gets the corresponding user id of the logged in user

### useUsername
Gets the corresponding user name of the logged in user


## 