import React, { useState, useEffect } from "react"

export const TotalHoursForm = ({userHours}) => {
    
    
    const [flights, setFlights] = useState([])
    const [setFlight, updateFlight] = useState(null);
    // const [currentState, updateState] = useState(defaultValue)
    const userId = parseInt(localStorage.getItem("luvair_user"))
    console.log(setFlight)
    const fetchFlights = () => {
        return fetch("http://localhost:8088/flights")
            .then(res => res.json())
            .then((flightArray) => {
                    setFlights(flightArray)
                 })
    }
    useEffect(() => {
       fetchFlights()
   
    }, [])

    
    const createPost = (event) => {
        console.log(setFlight)
        const newPosts = {
            postTime: Date.now(),
            userId: userId,
            flightId: setFlight 
        }
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPosts)
        }
    
    
        return fetch(`http://localhost:8088/posts`, fetchOptions)
            .then(response => response.json())
            .then( 
                () => userHours() 
            )
    }

   
    

    return (
        
        <div>
            <select 
            
                onChange={
                        (evt) => {
                        
                      
                      updateFlight(parseInt(evt.target.value));
                            }}>
                
                 <option value = "0"> Please select a Flight Number</option>
                {flights?.map((flight) => {
                    return <option value={flight.id}> {flight.flightNumber} </option>
                })}
            </select>
            <button
                onClick={
                    (evt) => createPost(evt)
                }>
                SUBMIT
            </button>
        </div>
    )
}
