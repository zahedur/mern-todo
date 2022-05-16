
// Authentication
exports.registerValidation = (data) => {
    let error = {};

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
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
        if (!passwordValidation(data.password)) {
            error.password = "Password is minimum 8 character, with at least a symbol, upper and lower case letters and a number"
        }
    }

    if (!data.confirmPassword) {
        error.confirmPassword = 'Confirm password field is required'
    } else {
        if (data.password !== data.confirmPassword) {
            error.confirmPassword = "Password doesn't match"
        }
    }

    return error;
}

exports.loginValidation = (data) => {
    let error = {};

    if (!data.email) {
        error.email = 'Email field is required'
    }else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    if (!data.password) {
        error.password = 'Password field is required'
    } else {
        if (!passwordValidation(data.password)) {
            error.password = "Password is minimum 8 character, with at least a symbol, upper and lower case letters and a number"
        }
    }

    return error;
}

exports.updateProfileValidation = (data) => {
    let error = {};

    if (!data.firstName) {
        error.firstName = 'First name field is required'
    } else {
        let checkNameError = nameValidation(data.firstName, 'First');
        if (checkNameError){
            error.firstName = checkNameError;
        }
    }

    if (!data.lastName) {
        error.lastName = 'Last name field is required'
    }else{
        let checkNameError = nameValidation(data.lastName, 'Last');
        if (checkNameError){
            error.lastName = checkNameError;
        }
    }

    if (!data.email) {
        error.email = 'Email field is required'
    } else {
        if (!isEmail(data.email)) {
            error.email = 'Invalid Email'
        }
    }

    return error;
}

exports.changePasswordValidation = (data) => {
    let error = {};

    if (!data.oldPassword) {
        error.oldPassword = 'Old Password field is required'
    }

    if (!data.newPassword) {
        error.newPassword = 'New Password field is required'
    } else {
        if (!passwordValidation(data.newPassword)) {
            error.newPassword = "Password is minimum 8 character, with at least a symbol, upper and lower case letters and a number"
        }
    }

    if (!data.confirmPassword) {
        error.confirmPassword = 'Confirm password field is required'
    } else {
        if (data.newPassword !== data.confirmPassword) {
            error.confirmPassword = "Password doesn't match"
        }
    }

    return error;
}


// Todos
exports.todoCreateValidation = (data) => {
    let error = {};

    if (!data.name) {
        error.name = 'Name field is required'
    } else {
        if(data.length < 3){
            error.firstName = 'Name minimum 3 character.'
        }
    }

    return error;
}

exports.todoUpdateValidation = (data) => {
    let error = {};

    if (!data.name) {
        error.name = 'Name field is required'
    } else {
        if(data.length < 3){
            error.firstName = 'Name minimum 3 character.'
        }
    }

    return error;
}


const nameValidation = (data, type) => {
    let error = '';
    if(!data.length) {
        error = type + 'Name field is required.'
    }

    let regex = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
    let check = regex.test(data);

    if(!check || data.includes('^')) {
        error = 'Invalid name. Please enter a valid name'
    }else{
        if(type === 'First' && data.length < 3){
            error = 'First name minimum 3 character.'
        }
    }
    return error;
}


const passwordValidation = (str) => {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

const isEmail = (email) => {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
}
