'use strict'

import DoctorsService from "../services/doctors.service.js";

const GetDoctorsControllers = async (request,response)=>{
    try {
        const doctorsData = await DoctorsService.GetDoctorsService();
        if(!doctorsData){
            return response.status(404).json({message:'NO doctors Found'})
        }else{
            return response.status(200).json({message:'Success',data:doctorsData})
        }
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({message:"Internal server Error"})
    }
}

const DoctorsControllers ={GetDoctorsControllers}

export default DoctorsControllers
