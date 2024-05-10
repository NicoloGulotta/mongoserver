import React, { useEffect } from 'react'
import { useState } from 'react'
export default function User() {
    const url = "http://localhost:3001/authors/me"
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(null);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    throw new Error(`Error fetching ${response.status}`)
                }
                const data = await response.json();
                setUserData(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching user data :", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [token]);
    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (!userData) {
        return <div>Error fetching user data.</div>;
    }

    return (
        <>
            <h1>{userData.name}</h1>
            <p>{userData.email}</p>
            <p>{userData.birthday}</p>
            <img src={userData.avart} alt="avatar"></img>
        </>
    );
};