import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../store/user.reducer";
import { logout } from "../store/user.action";
import { LoginSignup } from "./login-signup";

export function AppHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((storeState => storeState.userModule.user))

    function onGoHomePage() {
        navigate('/')
    }

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }

    return (
        <header className="app-header main-layout full">
            <div className="app-header-container">
                <span className="logo" onClick={onGoHomePage}>MisterToy</span>
                <span className="hamburger"><FaBars /></span>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/review">Review</NavLink>
                </nav>
                {user && <section className="user-info">
                    <p>{user.fullname}</p>
                    <button onClick={onLogout}>Logout</button>
                </section>}

                {!user && <section className="user-info">
                    <LoginSignup setUser={setUser} />
                </section>}
            </div>
        </header>
    )
}
