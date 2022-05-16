import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Modal, Dropdown} from "react-bootstrap";
import {toast} from "react-toastify";
import {confirm, myDateFormat} from "../helper/helper";


const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [editTodo, setEditTodo] = React.useState({});

    useEffect(() => {
        getTodos();
    },[])

    const getTodos = () => {
        axios.get('todos')
            .then(res => {
                console.log(res.data)
                if (res.data.status){
                    setTodos(res.data.todos);
                }
            }).catch(err => {
                console.log(err);
            })
    }

    const addEdit = (type, todo = {}) => {
        setEditTodo(() => todo)
        setModalType(type);
        setModalShow(true);
    }

    const hideModal = () => {
        setModalShow(false);
        setModalType('');
    }

    const addNew = (todo) => {
        let todoList = [...todos]
        todoList.unshift(todo);
        setTodos(todoList);
    }

    const updateTodo = (todo) => {
        let todoList = [...todos]
        const index = todoList.findIndex(t => t._id === todo._id);
        todoList[index] = todo;
        setTodos(todoList);
    }

    const updateTodoAfterDelete = (id) => {
        let todoList = [...todos]
        const filteredTodos = todoList.filter(t => t._id !== id);
        setTodos(filteredTodos);
    }

    const markAs = (id, status) => {
        let title = '';
        if (status === 'true'){
            title = 'Want to mark as completed this';
        }else{
            title = 'Want to mark as pending this?';
        }

        confirm(title, () => {
            axios.post('todos/status', {id, status}).then(res => {
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
                    updateTodo(res.data.todo);
                }
            }).catch(err => {
                console.log(err);
                if (err.response && err.response.status === 422){
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
            })
        })
    }

    const deleteTodo = (id) => {
        confirm('Want to delete this?', () => {
            axios.post('todos/delete', {id}).then(res => {
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
                    updateTodoAfterDelete(id);
                }
            }).catch(err => {
                console.log(err);
                if (err.response && err.response.status === 422){
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
            })
        })
    }



    return (
        <>
            <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5>All Todos</h5>

                    <button className="btn btn-primary btn-sm" onClick={() => addEdit('add')}>Add New</button>
                </div>
                <div className="mt-3">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">status</th>
                            <th className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.length ?
                            <>
                                {
                                    todos.map(todo => (
                                        <tr key={todo._id}>
                                            <td>{todo.name}</td>
                                            <td>{todo.description}</td>
                                            <td className="text-center">
                                                {myDateFormat(todo.createdAt, 'DD/MM/YYYY')}
                                            </td>
                                            <td className="text-center">
                                                {todo.status ? <span className="bg-success rounded px-1 text-white pb-1">Completed</span> : <span className="bg-warning rounded px-1">Pending</span>}
                                            </td>
                                            <td >
                                                <Dropdown className="text-center">
                                                    <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
                                                        Action
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item as="button" onClick={() => deleteTodo(todo._id)}>Delete</Dropdown.Item>
                                                        <Dropdown.Item as="button" onClick={() => addEdit('edit', todo)}>Edit</Dropdown.Item>

                                                        { todo.status ?
                                                            <Dropdown.Item as="button" onClick={() => markAs(todo._id, "false")}>Pending</Dropdown.Item> :
                                                            <Dropdown.Item as="button" onClick={() => markAs(todo._id, "true")}>Completed</Dropdown.Item>
                                                        }

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </>
                            :
                            <></>
                        }
                        </tbody>

                    </table>
                </div>
            </div>

            {modalType === 'add' && <AddNewTodoModal addNew={addNew} show={modalShow} onHide={hideModal} /> }

            {modalType === 'edit' && <EditTodoModal updateTodo={updateTodo} todo={editTodo} show={modalShow} onHide={hideModal} /> }
        </>



    )
}

const AddNewTodoModal = ({ addNew, show, onHide}) => {

    const [form, setForm] = useState({
        name: '',
        description: ''
    });

    const [error, setError] = useState([]);

    const changeHandler = (e) => {
        if (e.target.id == 'name'){
            let updatedForm = {...form};
            updatedForm.name =  e.target.value;
            setForm(updatedForm);
        }
        if (e.target.id == 'description'){
            let updatedForm = {...form};
            updatedForm.description =  e.target.value;
            setForm(updatedForm);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!form.name) {
            setError({name: 'Name field is required'});
        }else{
            if (form.name.length < 3){
                setError({name: 'Name minimum 3 character'});
            }else{
                addNewTodo(form);
            }
        }
    }

    const addNewTodo = (data) => {
        axios.post('todos/create', data).then(res => {
            if (res.data.status){
                cleanForm();
                onHide()
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                addNew(res.data.todo);
            }
        }).catch(err => {
            console.log(err);
            if (err.response && err.response.status === 422){
                setError(err.response.data.error);
            }
        })
    }

    const cleanForm = () => {
        let formData = {
            name: '',
            description: ''
        };
        setForm(formData);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Todo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="px-5 py-4">
                    <form onSubmit={submitHandler}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" className="form-control" onChange={changeHandler} value={form.name}/>
                            {error.name && <span className="text-danger">{error.name}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" className="form-control" onChange={changeHandler} value={form.description} />
                        </div>
                        <div className="text-end">
                            <button className="btn btn-success btn-sm">Save</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const EditTodoModal = ({ updateTodo, todo, show, onHide}) => {

    const [form, setForm] = useState({
        name: '',
        description: ''
    });
    const [error, setError] = useState([]);

    useEffect(() => {
        console.log('ddd')
        const updatedForm = {...form};

        updatedForm.name = todo.name;
        updatedForm.description = todo.description;
        updatedForm.id = todo._id;

        setForm(updatedForm);

    },[])

    const changeHandler = (e) => {
        if (e.target.id == 'name'){
            let updatedForm = {...form};
            updatedForm.name =  e.target.value;
            setForm(updatedForm);
        }
        if (e.target.id == 'description'){
            let updatedForm = {...form};
            updatedForm.description =  e.target.value;
            setForm(updatedForm);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!form.name) {
            setError({name: 'Name field is required'});
        }else{
            if (form.name.length < 3){
                setError({name: 'Name minimum 3 character'});
            }else{
                addNewTodo(form);
            }
        }
    }

    const addNewTodo = (data) => {
        axios.post('todos/update', data).then(res => {
            if (res.data.status){
                onHide()
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                updateTodo(res.data.todo);
            }
        }).catch(err => {
            console.log(err);
            if (err.response && err.response.status === 422){
                setError(err.response.data.error);
            }
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Todo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="px-5 py-4">
                    <form onSubmit={submitHandler}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" className="form-control" onChange={changeHandler} value={form.name}/>
                            {error.name && <span className="text-danger">{error.name}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" className="form-control" onChange={changeHandler} value={form.description} />
                        </div>
                        <div className="text-end">
                            <button className="btn btn-success btn-sm">Update</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Todo;

