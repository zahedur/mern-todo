import React from "react";
import {TodoContext} from "../store/TodoContext";

class MyTodos extends React.Component {

    componentDidMount() {
        console.log(this.context);
    }

    login = () => {
        this.context.setIsAuthenticated(true);
    }

    logout = () => {
        this.context.setIsAuthenticated(false);
    }

    render() {
        return (
            <div>
                <button onClick={this.login}>Login</button>
                <button onClick={this.logout}>logout</button>
            </div>
        )
    }
}

MyTodos.contextType = TodoContext;
export default MyTodos
