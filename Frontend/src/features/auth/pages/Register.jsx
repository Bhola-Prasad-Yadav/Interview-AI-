import React,{useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import AppHeader from '../../../components/AppHeader.jsx'

const Register = () => {

    const navigate = useNavigate()
    const { user, loading, handleRegister } = useAuth()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await handleRegister({username,email,password})
            navigate("/")
        } catch (err) {
            setError(err?.response?.data?.message || "Registration failed")
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [ user, navigate ])

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main>
            <AppHeader showAuthLinks />
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button className='button primary-button' >Register</button>

                </form>
                {error && <p>{error}</p>}

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register
