'use strict'

import AppointmentsService from "../services/appointments.service.js"

const AddAppointMentController = async(request,response)=>{
    console.log(request,"Request VAlue is")
    try {
        const data = AppointmentsService.PostAppointmentServive(request);
        if(!data){
            return response.status(401).json({message:"Failed to add appointment"})
        }else{
            return response.status(200).json({message:"Success appointment Added sucessfully"})
        }
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({message:"Internal Server Error"})
    }
}

const AppointmentsController = {AddAppointMentController};
export default AppointmentsController