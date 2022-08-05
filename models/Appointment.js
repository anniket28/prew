const mongoose=require('mongoose')

const appointmentsSchema=new mongoose.Schema({
    Product_Type:{
        type: String
    },
    Purchased_From:{
        type: String
    },
    Service_Type:{
        type: String
    },
    Customer_Name:{
        type: String
    },
    Customer_Contact_Number:{
        type: Number
    },
    Customer_Email:{
        type: String
    },
    Customer_City:{
        type: String
    },
    Customer_Pincode:{
        type: Number
    },
    Customer_Address:{
        type: String
    },
    Customer_Preferred_date:{
        type: String
    },
    Customer_Preferred_Time_Slot:{
        type: String
    },
    Fault_Description:{
        type: String
    }
})

mongoose.models={}
export default mongoose.model("Appointments",appointmentsSchema)