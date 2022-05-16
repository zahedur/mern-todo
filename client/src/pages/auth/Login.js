import React from "react";
import {TodoContext} from "../../store/TodoContext";
import axios from "axios";
import {loginValidation} from "../../helper/validation";
import { toast } from 'react-toastify';
import {setTokenInAxiosHeader} from "../../helper/helper";
import {Link} from "react-router-dom";

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        error: [],
    }

    componentDidMount() {

    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        setTimeout(() => {
            const validate = loginValidation(this.state, 'typing', e);
            if (Object.keys(validate).length) {
                this.setState({error: validate})
            }else {
                this.setState({error: []})
            }
        }, 100)

    }


    submitHandler = async (e) => {
        e.preventDefault();
        const validate = loginValidation(this.state, 'submit');
        if (Object.keys(validate).length){
            this.setState({error: validate})
        }else {
            this.setState({error: []})
            const { email, password } = this.state;

            await axios.post('login', {email, password})
                .then(res => {
                    if (res.data.status){
                        const token = res.data.token;
                        setTokenInAxiosHeader(token);
                        localStorage.setItem('token', token);
                        this.context.setIsAuthenticated(true);
                        this.context.setUser(res.data.user);


                        toast.success(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }).catch(err => {

                    if (err.response && err.response.status === 422){
                        this.setState({error: err.response.data.error})
                    }
                    if (err.response && err.response.status === 401){
                        toast.error(err.response.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
        }
    }

    notify = () => toast("Wow so easy!");

    render() {

        const { email, password, error } = this.state;

        return (
            <div className="authentication">
                <div className="auth">
                    <div className="text-center mb-3">
                        <h3>My Todo App</h3>
                    </div>
                    <div className="auth-form">
                        <h5 className="text-primary-200">Login</h5>
                        <form className="mt-4" onSubmit={this.submitHandler}>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" onChange={this.changeHandler} value={email}
                                       className={error.email ? 'form-control is-invalid' : 'form-control'}
                                       placeholder="Email"/>
                                {error.email &&
                                <small className="text-danger animate__animated animate__fadeIn">{error.email}</small>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Password</label>
                                <input type="password" name="password" onChange={this.changeHandler} value={password}
                                       className={error.password ? 'form-control is-invalid' : 'form-control'}
                                       placeholder="Password"/>
                                {error.password &&
                                <small className="text-danger animate__animated animate__fadeIn">{error.password}</small>}
                            </div>
                            <div className="form-group d-flex justify-content-between align-items-center">
                                <Link to="/register">Create Account</Link>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = TodoContext;
export default Login;
