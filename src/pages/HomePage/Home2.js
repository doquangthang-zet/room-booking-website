import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';

export default function Home2() {
    const currentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser())
    }, [])

    return (
        <main>
            <h1>Hello {currentUser && currentUser.nickname} - {currentUser && currentUser.email}</h1>

            <button onClick={() => console.log(currentUser)}>Sign out</button>
            <Link to={'/home3'}>enter</Link>
        </main>
    )
}