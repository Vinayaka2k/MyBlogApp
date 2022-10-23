import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
// import PrivateRoute from "./Components/PseduoComponents/PrivateRoute"
import Home from "./Components/Home"
import Profile from "./Components/Profile"
import Blog from "./Components/Blog"
import Blogs from "./Components/Blogs"
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Post from "./Components/Post"
import Edit from "./Components/Edit"
import Admin from "./Components/Admin"

const App = () => {
    return (
        <div className="conatiner">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/blogs" element={< Blogs/>}/>
                    <Route exact path="/blog/:id" element={<Blog />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/me" element={<Profile />} />
                    <Route exact path="/post" element={<Post />} />
                    <Route exact path="/blog/:id/edit" element={<Edit />} />
                    <Route exact path="/admin" element={<Admin />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App