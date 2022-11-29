/**
    * Function validate inputs
    * Author: doduyhung1292 (11/11/2022)
*/

export const validateRequiredInputs = (employeeCode, employeeName, departmentName) => {
    try {
        var errMsg = [];
        if (!employeeCode) {errMsg.push("Mã nhân viên không được để trống")};
        if (!employeeName) {errMsg.push("Tên nhân viên không được để trống")};
        if (!departmentName) {errMsg.push("Đơn vị không được để trống")};

        if (errMsg.length > 0) {return errMsg}
            else {return}
       
    } catch (error) {
        console.log(error);
    }
 };

/**
 * 
 * Validate email
 * Author: doduyhung1292 (11/11/2022)
 */

 export const validateEmail = (e) => {
    try {
        if(!e) {return}
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
        return
        } else {
           return("Email không hợp lệ.")
        } 
    } catch (error) {
        console.log(error);
    }
};

export const validatDate = (date) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
};