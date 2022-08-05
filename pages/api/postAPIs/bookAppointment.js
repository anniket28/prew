import connectDatabase from '../../../middleware/database'
import Appointment from '../../../models/Appointment'
const nodemailer=require('nodemailer')

const handler=async(req,res)=>{
    if(req.method=='POST'){
        try {
            const {productTypeVal, purchasedFromVal, serviceTypeVal, customerNameVal, customerContactVal, customerEmailVal, customerCityVal, customerPincodeVal, customerAddressLine1Val, customerAddressLine2Val, preferredDateVal, preferredTimeSlotVal, faultDescriptionVal} = req.body
        
            let appointment=new Appointment({
                Product_Type: productTypeVal,
                Purchased_From: purchasedFromVal,
                Service_Type: serviceTypeVal,
                Customer_Name: customerNameVal,
                Customer_Contact_Number: customerContactVal,
                Customer_Email: customerEmailVal,
                Customer_City: customerCityVal,
                Customer_Pincode: customerPincodeVal,
                Customer_Address: customerAddressLine1Val + " " +customerAddressLine2Val,
                Customer_Preferred_date: preferredDateVal,
                Customer_Preferred_Time_Slot: preferredTimeSlotVal,
                Fault_Description: faultDescriptionVal,
            })
            await appointment.save()

            // Mail to Self
            var transporter1=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'prewzirakpur@gmail.com',
                    pass:'zokwhteaddpqzumn'
                }
            });
            // Setting Mail Options
            var mailOptions={
                from: 'prewzirakpur@gmail.com',
                to: 'harshit.haridwar@gmail.com',
                subject:'New Appointment Booked',
                text: `A new appointment has been booked. Details:\nProduct Type: ${productTypeVal}\nPurchased From: ${purchasedFromVal}\nService Type: ${serviceTypeVal}\nCustomer Name: ${customerNameVal}\nCustomer Contact Number: ${customerContactVal}\nCustomer Email: ${customerEmailVal}\nCustomer City: ${customerCityVal}\nCustomer Pincode: ${customerPincodeVal}\nCustomer Address: ${customerAddressLine1Val+" "+customerAddressLine2Val}\nCustomer Preferred Date: ${preferredDateVal}\nCustomer Preferred Time Slot: ${preferredTimeSlotVal}\nFault Description: ${faultDescriptionVal}`
            };
            // Sent Mail Confirmation
            transporter1.sendMail(mailOptions,(err,send)=>{
                if(err){                        
                       console.log(err);
                }
                else{
                    console.log('Email Sent: '+send.response)
                }
            });

            // Mail to Customer
            var transporter2=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'prewzirakpur@gmail.com',
                    pass:'zokwhteaddpqzumn'
                }
            });
            // Setting Mail Options
            var mailOptions={
                from: 'prewzirakpur@gmail.com',
                to: customerEmailVal,
                subject:'Appointment Booked',
                text: `Your appintment has been booked successfully. Details:\nProduct Type: ${productTypeVal}\nPurchased From: ${purchasedFromVal}\nService Type: ${serviceTypeVal}\nCustomer Name: ${customerNameVal}\nCustomer Contact Number: ${customerContactVal}\nCustomer Email: ${customerEmailVal}\nCustomer City: ${customerCityVal}\nCustomer Pincode: ${customerPincodeVal}\nCustomer Address: ${customerAddressLine1Val+" "+customerAddressLine2Val}\nCustomer Preferred Date: ${preferredDateVal}\nCustomer Preferred Time Slot: ${preferredTimeSlotVal}\nFault Description: ${faultDescriptionVal}`
            };
            // Sent Mail Confirmation
            transporter2.sendMail(mailOptions,(err,send)=>{
                if(err){                        
                       console.log(err);
                }
                else{
                    console.log('Email Sent: '+send.response)
                }
            });

            res.status(200).json({appointmentBooked:true})
        } catch (error) {
            console.log("Error: "+error)
            res.json("Some Error Occured")
        }
    }
    else{
        res.status(405).json("Not Allowed")
    }
}

export default connectDatabase(handler)