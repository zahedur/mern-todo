import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

export const setTokenInAxiosHeader = (token) => {
    axios.defaults.headers['token'] = token;
}

export const myDateFormat = (date, format) => {
    return moment(date).format(format);

}

export const confirm = (title, callback) => {
    Swal.fire({
        title: "Are you sure?",
        text: title,
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm',
        denyButtonText: `Cancel`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            callback()
        } else if (result.isDenied) {

        }
    })

}
