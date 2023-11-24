import useAuth from "../Hooks/useAuth";

const Register = () => {
    const {googleLogin, createUser } = useAuth()
    return (
        <div>
            <p>Hi, I am Register</p>
        </div>
    );
};

export default Register;