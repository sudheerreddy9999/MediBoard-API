'use strict'

import DB from "../config/app/query.config.js";
import pgsql from '../config/database/database.config.js';

const GETDOCTORS = async()=>{
    try {
        const query = DB.QUERY.GET_DOCTORS;
        const data = await pgsql.query(query,{type: pgsql.QueryTypes.SELECT})
        return data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }
}

const DoctorsDto = {GETDOCTORS};

export default DoctorsDto;