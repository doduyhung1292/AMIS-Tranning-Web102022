/**
* Formate date
* Author: doduyhung1292 (10/11/2022)
*/
export const formatDate = (date) => {
        try {
            var dateBirth = new Date(date);
            var day = dateBirth.getDate();
            if (day<10) {day = `0${day}`};

            var month = dateBirth.getMonth() + 1;
            if(month<10) {month = `0${month}`};

            var year = dateBirth.getFullYear();

            return `${year}-${month}-${day}`;
        } catch (error) {
            console.log(error)
        } 
}