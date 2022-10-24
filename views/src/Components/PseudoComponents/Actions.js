import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useBearer from '../../Hooks/useBearer';
import useUid from '../../Hooks/useUid';

const Actions = (props) => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const bearer = useBearer()
    const uid = useUid()
    const admin = useAdmin()
    const id = props.id
    const baseUrl = "http://localhost:3001"

    const EditHandler = () => {
        nav(`/blog/${id}/edit`)
    }
    const DeleteHandler = async () => {
        if(!window.confirm("Are you sure? There's no coming back!")) {
            setLoading(false)
            return;
        }
        try {
            setLoading(true)
            const res = await axios.delete(`${baseUrl}/api/blog/${id}`, {
                headers: {
                    "Authorization": await bearer
                }
            })
            if(res.status === 200) {
                nav("/me")
            }
            else if(res.status === 403 || res.status === 401) {    
                alert(res.err)
                setLoading(false)
            }
        } catch(err) {
            alert(err.response.err)
            setLoading(false)
        }
    }

    return (
        <div>
        {(admin || uid===props.userId) ?
            <div className="m-auto w-full sm:w-1/2 py-2 px-4 lg:w-auto border-4 border-navBtn rounded-md"> 
                <h1 className="text-navBtn text-center">ACTIONS</h1>
                <div className="flex mt-4 justify-center space-x-4">
                    <button disabled={loading} onClick={EditHandler} className="px-4 py-0.5 w-min text-center bg-navBtn rounded-md text-white border-2 border-navBtn hover:bg-secondaryBg hover:text-navBtn">edit</button>
                    <button disabled={loading} onClick={DeleteHandler} className="px-4 py-0.5 w-min text-center bg-navBtn rounded-md text-white border-2 border-navBtn hover:bg-secondaryBg hover:text-navBtn">delete</button>
                </div>
            </div>
            : null }
        </div>
        )
}

export default Actions