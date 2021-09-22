import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../APImanager"
import "./UserProfile.css"

export const UserProfile = () => {
    const [users, setUser] = useState([])
    const [totalUserHours, setTotalHours] = useState(0)
    

    const userId = localStorage.getItem("luvair_user")
    const currentUser = getCurrentUser()

    const userHoursFlown = () => {
        return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=flight`)
            .then(res => res.json())
            .then((data) => {  
                 const sumOfHours = data.reduce((sum, currentData) => {
                     console.log(currentData)
                    return sum + currentData.flight?.airHours
                 }, 0
                 ) 
                
                        setTotalHours(sumOfHours)
                   
                 })
                 
    }

    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(res => res.json())
                .then((userArray) => {
                        setUser(userArray)
                     })
                userHoursFlown()
        },
        []
    )
    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(res => res.json())
                .then((userArray) => {
                        setUser(userArray)
                     })
        },
        [totalUserHours]
    )

    return (
        <>
        <h1>My LUVair Profile</h1>

        {
            users.map(
                (user) => {
                    
                        return user.id === parseInt(currentUser) ? <div><h2>{user.name}</h2><img src={user.userImg} /><h2>Total Hours in Air: {totalUserHours}</h2></div>:""
                }
            )
        }
        </>
    )
}
