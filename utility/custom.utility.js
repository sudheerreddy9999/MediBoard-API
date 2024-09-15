'use strict'
const customExceptionMessage =(errorCode,errorMessage)=>{
    return {errorCode,errorMessage}
}

const formatDateTime = (date, time) => {
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}T${time}`;
  };

const customUtility = {customExceptionMessage, formatDateTime};
export default customUtility;