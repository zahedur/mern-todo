import isEmail from 'validator/es/lib/isEmail';

export const registerValidation = (data, type, e = '') => {

    let error = []

    const removeItem = (error, name) => {
        if(error.hasOwnProperty(name)){
            delete error[name]
        }
        return error;
    }

    if (type === 'typing'){
        error = data.error;

        if (e.target.name === 'firstName'){
            if(!data.firstName) {
                error.firstName = 'First Name field is required'
            }else{
                error = removeItem(error, e.target.name)
            }
        }

        if (e.target.name === 'lastName'){
            if(!data.lastName) {
                error.lastName = 'Last Name field is required'
            }else{
                error = removeItem(error, e.target.name)
            }
        }

        if (e.target.name === 'email'){
            if(!data.email) {
                error.email = 'Email field is required'
            }else {
                if (!isEmail(data.email)) {
                    error.email = 'Invalid Email'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'password'){
            if(!data.password) {
                error.password = 'Password field is required'
            }else{
                if (data.password.length < 8) {
                    error.password = 'Password is minimum 8 character'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'confirmPassword'){

            if(!data.confirmPassword) {
                error.confirmPassword = 'Confirm password field is required'
            }else {
                if (data.password !== data.confirmPassword) {
                    error.confirmPassword = "Password doesn't match"
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }
    }


    if (type === 'submit') {

        if(!data.firstName) {
            error.firstName = 'First Name field is required'
        }

        if(!data.lastName) {
            error.lastName = 'Last Name field is required'
        }

        if (!data.email) {
            error.email = 'Email field is required'
        } else {
            if (!isEmail(data.email)) {
                error.email = 'Invalid Email'
            }
        }

        if (!data.password) {
            error.password = 'Password field is required'
        } else {
            if (data.password.length < 8) {
                error.password = 'Password is minimum 8 character'
            }
        }

        if (!data.confirmPassword) {
            error.confirmPassword = 'Confirm password field is required'
        } else {
            if (data.password !== data.confirmPassword) {
                error.confirmPassword = "Password doesn't match"
            }
        }
    }
    return error;
}

export const loginValidation = (data, type, e = '') => {

    let error = []

    const removeItem = (error, name) => {
        if(error.hasOwnProperty(name)){
            delete error[name]
        }
        return error;
    }

    if (type === 'typing'){
        error = data.error;
        if (e.target.name === 'email'){
            if(!data.email) {
                error.email = 'Email field is required'
            }else {
                if (!isEmail(data.email)) {
                    error.email = 'Invalid Email'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'password'){
            if(!data.password) {
                error.password = 'Password field is required'
            }else{
                if (data.password.length < 8) {
                    error.password = 'Password is minimum 8 character'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }
    }

    if (type === 'submit'){
        if(!data.email) {
            error.email = 'Email field is required'
        }else {
            if (!isEmail(data.email)) {
                error.email = 'Invalid Email'
            }
        }

        if(!data.password) {
            error.password = 'Password field is required'
        }else{
            if (data.password.length < 8) {
                error.password = 'Password is minimum 8 character'
            }
        }
    }

    return error;
}

export const forgotPasswordValidation = (data, type, e = '') => {

    let error = []

    const removeItem = (error, name) => {
        if(error.hasOwnProperty(name)){
            delete error[name]
        }
        return error;
    }

    if (type === 'typing'){
        error = data.error;
        if (e.target.name === 'email'){
            if(!data.email) {
                error.email = 'Email field is required'
            }else {
                if (!isEmail(data.email)) {
                    error.email = 'Invalid Email'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }
    }

    if (type === 'submit'){
        if(!data.email) {
            error.email = 'Email field is required'
        }else {
            if (!isEmail(data.email)) {
                error.email = 'Invalid Email'
            }
        }
    }

    return error;
}

export const forgotPasswordCodeValidation = (data, type, e = '') => {

    let error = []

    const removeItem = (error, name) => {
        if(error.hasOwnProperty(name)){
            delete error[name]
        }
        return error;
    }

    if (type === 'typing'){
        error = data.error;
        if (e.target.name === 'code'){
            if(!data.code) {
                error.code = 'Code field is required'
            }else {
                error = removeItem(error, e.target.name)
            }
        }
    }

    if (type === 'submit'){
        if(!data.code) {
            error.code = 'Code field is required'
        }
    }

    return error;
}

export const resetPasswordValidation = (data, type, e = '') => {

    let error = []

    const removeItem = (error, name) => {
        if(error.hasOwnProperty(name)){
            delete error[name]
        }
        return error;
    }

    if (type === 'typing'){
        error = data.error;

        if (e.target.name === 'newPassword'){
            if(!data.newPassword) {
                error.newPassword = 'New password field is required'
            }else{
                if (data.newPassword.length < 8) {
                    error.newPassword = 'New password is minimum 8 character'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'confirmPassword'){

            if(!data.confirmPassword) {
                error.confirmPassword = 'Confirm password field is required'
            }else {
                if (data.newPassword !== data.confirmPassword) {
                    error.confirmPassword = "Password doesn't match"
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }
    }


    if (type === 'submit') {

        if (!data.newPassword) {
            error.newPassword = 'New password field is required'
        } else {
            if (data.newPassword.length < 8) {
                error.newPassword = 'New password is minimum 8 character'
            }
        }

        if (!data.confirmPassword) {
            error.confirmPassword = 'Confirm password field is required'
        } else {
            if (data.newPassword !== data.confirmPassword) {
                error.confirmPassword = "Password doesn't match"
            }
        }
    }
    return error;
}

export const verifyValidation = (data) => {

    //console.log(data)

    let error = '';

    if(!data) {
        error = 'Verify code field is required'
    }else{
        error = ''
    }

    return error;
}

export const contactValidation = (data, type, e = '') => {

    let error = []

    const removeItem = (error, name) => {
        if(error.hasOwnProperty(name)){
            delete error[name]
        }
        return error;
    }

    if (type === 'typing'){
        error = data.error;
        if (e.target.name === 'name'){
            if(!data.name) {
                error.name = 'Name field is required'
            }else{
                if (data.name.length < 3) {
                    error.name = 'Type minimum 3 character'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'email'){
            if(!data.email) {
                error.email = 'Email field is required'
            }else {
                if (!isEmail(data.email)) {
                    error.email = 'Invalid Email'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'subject'){
            if(!data.subject) {
                error.subject = 'Subject field is required'
            }else{
                if (data.subject.length < 3) {
                    error.subject = 'Type minimum 3 character'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'message'){
            if(!data.message) {
                error.message = 'Message field is required'
            }else{
                if (data.message.length < 10) {
                    error.message = 'Type minimum 10 character'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

    }


    if (type === 'submit') {
        if (!data.name) {
            error.name = 'Name field is required'
        } else {
            if (data.name.length < 3) {
                error.name = 'Type minimum 3 character'
            }
        }

        if (!data.email) {
            error.email = 'Email field is required'
        } else {
            if (!isEmail(data.email)) {
                error.email = 'Invalid Email'
            }
        }

        if(!data.subject) {
            error.subject = 'Subject field is required'
        }else{
            if (data.subject.length < 3) {
                error.subject = 'Type minimum 3 character'
            }
        }

        if(!data.message) {
            error.message = 'Message field is required'
        }else{
            if (data.message.length < 10) {
                error.message = 'Type minimum 10 character'
            }
        }


    }
    return error;
}

export const changePasswordValidation = (data, type, e = '') => {

    let error = []

    const removeItem = (error, name) => {
        if(error.hasOwnProperty(name)){
            delete error[name]
        }
        return error;
    }

    if (type === 'typing'){
        error = data.error;

        if (e.target.name === 'oldPassword'){
            if(!data.oldPassword) {
                error.oldPassword = 'Old Password field is required'
            }else{
                if (data.oldPassword.length < 8) {
                    error.oldPassword = 'Password is minimum 8 character'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'password'){
            if(!data.password) {
                error.password = 'New password field is required'
            }else{
                if (data.password.length < 8) {
                    error.password = 'New password is minimum 8 character'
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }

        if (e.target.name === 'confirmPassword'){

            if(!data.confirmPassword) {
                error.confirmPassword = 'Confirm password field is required'
            }else {
                if (data.password !== data.confirmPassword) {
                    error.confirmPassword = "Password doesn't match"
                }else {
                    error = removeItem(error, e.target.name)
                }
            }
        }
    }


    if (type === 'submit') {

        if(!data.oldPassword) {
            error.oldPassword = 'Old password field is required'
        }else{
            if (data.oldPassword.length < 8) {
                error.oldPassword = 'Old password is minimum 8 character'
            }
        }


        if (!data.password) {
            error.password = 'New password field is required'
        } else {
            if (data.password.length < 8) {
                error.password = 'New password is minimum 8 character'
            }
        }

        if (!data.confirmPassword) {
            error.confirmPassword = 'Confirm password field is required'
        } else {
            if (data.password !== data.confirmPassword) {
                error.confirmPassword = "Password doesn't match"
            }
        }
    }
    return error;
}
