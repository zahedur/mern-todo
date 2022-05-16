import React from "react";
import {TodoContext} from "../../store/TodoContext";
import axios from "axios";
import {loginValidation, registerValidation} from "../../helper/validation";
import { toast } from 'react-toastify';
import {setTokenInAxiosHeader} from "../../helper/helper";
import {Link, Navigate} from "react-router-dom";

class Register extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: [],
        registered: false
    }

    componentDidMount() {

    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        setTimeout(() => {
            const validate = registerValidation(this.state, 'typing', e);
            if (Object.keys(validate).length) {
                this.setState({error: validate})
            }else {
                this.setState({error: []})
            }
        }, 100)

    }


    submitHandler = async (e) => {
        e.preventDefault();
        const validate = registerValidation(this.state, 'submit');
        if (Object.keys(validate).length){
            this.setState({error: validate})
        }else {
            this.setState({error: []})
            const { firstName, lastName, email, password, confirmPassword } = this.state;
            await axios.post('register', {firstName, lastName, email, password, confirmPassword})
                .then(res => {
                    if (res.data.status){
                        toast.success(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.cleanForm();
                        this.setState({
                            registered: true
                        })
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

    cleanForm = () => {

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: [],
        });
    }

    render() {

        const { firstName, lastName, email, password, confirmPassword, error } = this.state;

        return (
            <div className="authentication">
                <div className="auth">
                    <div className="text-center mb-3">
                        <h3>My Todo App</h3>
                        {this.state.registered && (
                            <Navigate to="/login" replace={true} />
                        )}
                    </div>
                    <div className="auth-form">
                        <h5 className="text-primary-200">Sign Up</h5>
                        <form className="mt-4" onSubmit={this.submitHandler}>
                            <div className="form-group mb-3">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" onChange={this.changeHandler} value={firstName}
                                       className={error.firstName ? 'form-control is-invalid' : 'form-control'}
                                       placeholder="First Name"/>
                                {error.firstName &&
                                <small className="text-danger animate__animated animate__fadeIn">{error.firstName}</small>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" onChange={this.changeHandler} value={lastName}
                                       className={error.lastName ? 'form-control is-invalid' : 'form-control'}
                                       placeholder="Last Name"/>
                                {error.lastName &&
                                <small className="text-danger animate__animated animate__fadeIn">{error.lastName}</small>}
                            </div>
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
                            <div className="form-group mb-3">
                                <label htmlFor="email">Confirm Password</label>
                                <input type="password" name="confirmPassword" onChange={this.changeHandler} value={confirmPassword}
                                       className={error.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                                       placeholder="Confirm Password"/>
                                {error.confirmPassword &&
                                <small className="text-danger animate__animated animate__fadeIn">{error.confirmPassword}</small>}
                            </div>
                            <div className="form-group d-flex justify-content-between align-items-center">
                                <div>Already have an account? <Link to="/login">Login</Link></div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Register.contextType = TodoContext;
export default Register;
