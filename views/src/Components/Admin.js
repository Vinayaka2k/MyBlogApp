import React,{useState, useEffect} from "react";
import UserCard from "./PseudoComponents/UserCard"
import Nav from "./PseudoComponents/Nav"
import useBearer from "../Hooks/useBearer";
import axios from "axios";
const baseUrl = "http://localhost:3001"

const Admin = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [unavailable, setUnavailable] = useState(false)
    const bearer = useBearer()

    useEffect(() => {
        const fetchUsers = async () => {
            let res = await axios.get(baseUrl + "/auth/users", {
                headers: {
                    "Authorization": await bearer
                }
            })
            if(res.data.success) {
                if(res.data.users.length > 0) {
                    setUsers(res.data.users)
                    setLoading(false)
                }
                else
                    setUnavailable(true)
            } else {
                setUnavailable(true)
                alert(res.data.err)
            }
        } 
        fetchUsers()
    }, [])

    return (
        <div className="min-h-screen w-screen bg-primaryBg pb-24 md:pb-0">
            <Nav />
            <div className="grid place-content-center sm:my-16 md:my-0">
                <div className="my-6 px-4">
                    <h1 className="text-2xl text-navBtn">List of all Users</h1>
                    <p className="text-md">you can visit each user's profile and view their public or private posts.</p>
                </div>

                <div className="grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 md:align-middle lg:gap-5">
                    {
                        !loading ? 
                        users.map((user, i) => {
                            return <UserCard key={i} username={user.username} role={user.role} id={user._id} thumbnail={`https://via.placeholder.com/150/FFFAFA/0D0C0C?text=${user.username}`} />
                        })
                        : unavailable ? 
                        <h1 className="p-10 text-center text-4xl text-navBtn">no users found</h1> :
                        <h1 className="p-10 text-center text-4xl text-navBtn">Loading, Please wait!</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default Admin