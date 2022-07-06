import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../contexts/appContext";
import { useNavigate } from "react-router-dom";
// global context and useNavigate later

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
};
// if possible prefer local state
// global state

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const { user, isLoading, showAlert, displayAlert, setupUser } =
        useAppContext();
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }
        const currentUser = { name, email, password };
        if (isMember) {
            setupUser({
                currentUser,
                endPoint: "login",
                alertText: "Login successfull! Redirecting...",
            });
        } else {
            setupUser({
                currentUser,
                endPoint: "register",
                alertText: "Register successfull! Redirecting...",
            });
        }
    };
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [user, navigate]);
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? "Login" : "Register"}</h3>
                {showAlert && <Alert />}
                {/* name field */}

                {!values.isMember && (
                    <FormRow
                        type="text"
                        value={values.name}
                        name="name"
                        handleChange={handleChange}
                    />
                )}

                <FormRow
                    type="email"
                    value={values.email}
                    name="email"
                    handleChange={handleChange}
                />
                <FormRow
                    type="password"
                    value={values.password}
                    name="password"
                    handleChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-block"
                    disabled={isLoading}
                >
                    submit
                </button>
                <p>
                    {values.isMember
                        ? "Not a member yet?"
                        : "Already a member?"}

                    <button
                        type="button"
                        onClick={toggleMember}
                        className="member-btn"
                    >
                        {values.isMember ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}

export default Register;
