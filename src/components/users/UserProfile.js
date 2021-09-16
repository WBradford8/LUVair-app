import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../APImanager"
import "./UserProfile.css"

export const UserProfile = () => {
    const [users, setUser] = useState([])
    const currentUser = getCurrentUser()
    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(res => res.json())
                .then((userArray) => {
                        setUser(userArray)
                     })
        },
        []
    )

    return (
        <>
        <h1>My LUVair Profile</h1>

        {
            users.map(
                (user) => {
                    
                        return user.id === parseInt(currentUser) ? <div><h2>{user.name}</h2><img src={user.userImg} /><h2>Total Hours in Air: {user.totalHours}</h2></div>:""
                }
            )
        }
        </>
    )
}
