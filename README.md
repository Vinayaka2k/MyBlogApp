# MyBlogApp



## Components

## App
Routes the path to the appropriate components
                    "/"                 <Home />
                    "/blogs"            <Blogs/>
                    "/blog/:id"         <Blog />
                    "/signup"           <Signup />
                    "/login"            <Login />
                    "/me"               <Profile />
                    "/post"             <Post />
                    "/blog/:id/edit"    <Edit />
                    "/admin"            <Admin />

### Home
Gets the latest blog created and sets the state to the fetched blog. If a blog exists, renders the `BlogCard` component with the appropriate title, desc and content. Until the blog gets fetched, a loading message is displayed. In case the user is not logged in, a login link is displayed after which the user would be able to post new blogs

## Pseudo Components

### BlogCard
Displays the thumbnail and title of the blog in a card. Clicking the card redirects to `/blog/id`. 
