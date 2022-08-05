import React,{useState} from 'react'
import Head from 'next/head'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json'

const CreateAppointment = () => {
  // 
  const productTypes=["A","B"]
  const purchasedFromPlaces=["Punjab Refrigeration Electrical Works","Others"]
  const serviceTypes=["On Door Appoitnment","Service Centre Appointment","Premiuim Appointment"]
  const cities=["Mohali","Zirakpur","Chandigarh","Panchkula","Derabassi"]
  const timeSlots=["09:00 AM to 10:00 AM","10:00 AM to 11:00 AM"]

  // 
  const [disableValue, setdisableValue] = useState(true)
  const [productTypeVal, setproductTypeVal] = useState('')
  const [purchasedFromVal, setpurchasedFromVal] = useState('')
  const [serviceTypeVal, setserviceTypeVal] = useState('')
  const [customerNameVal, setcustomerNameVal] = useState('')
  const [customerContactVal, setcustomerContactVal] = useState('')
  const [customerEmailVal, setcustomerEmailVal] = useState('')
  const [customerCityVal, setcustomerCityVal] = useState('')
  const [customerPincodeVal, setcustomerPincodeVal] = useState('')
  const [customerAddressLine1Val, setcustomerAddressLine1Val] = useState('')
  const [customerAddressLine2Val, setcustomerAddressLine2Val] = useState('')
  const [preferredDateVal, setpreferredDateVal] = useState('')
  const [preferredTimeSlotVal, setpreferredTimeSlotVal] = useState('')
  const [faultDescriptionVal, setfaultDescriptionVal] = useState('')

  // 
  const handleChange=(event)=>{
    if(event.target.name==='productTypeVal'){
      setproductTypeVal(event.target.value)
    }
    else if(event.target.name==='purchasedFromVal'){
      setpurchasedFromVal(event.target.value)
    }
    else if(event.target.name==='serviceTypeVal'){
      setserviceTypeVal(event.target.value)
    }
    else if(event.target.name==='customerNameVal'){
      setcustomerNameVal(event.target.value)
    }
    else if(event.target.name==='customerContactVal'){
      setcustomerContactVal(event.target.value)
    }
    else if(event.target.name==='customerEmailVal'){
      setcustomerEmailVal(event.target.value)
    }
    else if(event.target.name==='customerCityVal'){
      setcustomerCityVal(event.target.value)
      if(event.target.value.length!=0){
        setdisableValue(false)
      }
      else{
        setdisableValue(true)
      }
    }
    else if(event.target.name==='customerPincodeVal'){
      setcustomerPincodeVal(event.target.value)
    }
    else if(event.target.name==='customerAddressLine1Val'){
      setcustomerAddressLine1Val(event.target.value)
    }
    else if(event.target.name==='customerAddressLine2Val'){
      setcustomerAddressLine2Val(event.target.value)
    }
    else if(event.target.name==='preferredDateVal'){
      setpreferredDateVal(event.target.value)
    }
    else if(event.target.name==='preferredTimeSlotVal'){
      setpreferredTimeSlotVal(event.target.value)
    }
    else if(event.target.name==='faultDescriptionVal'){
      setfaultDescriptionVal(event.target.value)
    }
  }

  // 
  const validateEmail=(mail) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true)
      }
      return (false)
  }

  // 
  const submitBookAppointment=async(event)=>{
    event.preventDefault()

    if(productTypeVal.length==0 || purchasedFromVal.length==0 || serviceTypeVal.length==0 || customerNameVal.length==0 || customerContactVal.length==0 || customerEmailVal.length==0 ||customerCityVal.length==0 || preferredDateVal.length==0 || preferredTimeSlotVal.length==0 || faultDescriptionVal==0){
      toast.error('Please fill all the required fields!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      if(customerContactVal[0]=='0'){
        toast.error('Contact Number should not start with zero!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if(customerContactVal.length!=10){
        toast.error('Invalid Contact Number!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if(!validateEmail(customerEmailVal)){
        toast.error('Invalid Email!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if(customerPincodeVal.length==0 || customerAddressLine1Val.length==0){
        toast.error('Please fill all the required fields!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        const data={productTypeVal, purchasedFromVal, serviceTypeVal, customerNameVal, customerContactVal, customerEmailVal, customerCityVal, customerPincodeVal, customerAddressLine1Val, customerAddressLine2Val, preferredDateVal, preferredTimeSlotVal, faultDescriptionVal}

        let bookAppointment=await fetch(`${config.host}/api/postAPIs/bookAppointment`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        })
        let bookAppointmentData=await bookAppointment.json()

        if(bookAppointmentData.appointmentBooked){
          Swal.fire({
            title: 'Success',
            text: 'Appointment Booked Successfully.',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          setproductTypeVal('')
          setpurchasedFromVal('')
          setserviceTypeVal
          setcustomerNameVal('')
          setcustomerContactVal('')
          setcustomerEmailVal('')
          setcustomerCityVal('')
          setdisableValue(false)
          setcustomerPincodeVal('')
          setcustomerAddressLine1Val('')
          setcustomerAddressLine2Val('')
          setpreferredDateVal('')
          setpreferredTimeSlotVal('')
          setfaultDescriptionVal('')
        }
      }
    }
  }

  // 
  const handleReset=(event)=>{
    event.preventDefault()

    setproductTypeVal('')
    setpurchasedFromVal('')
    setserviceTypeVal
    setcustomerNameVal('')
    setcustomerContactVal('')
    setcustomerEmailVal('')
    setcustomerCityVal('')
    setcustomerPincodeVal('')
    setcustomerAddressLine1Val('')
    setcustomerAddressLine2Val('')
    setpreferredDateVal('')
    setpreferredTimeSlotVal('')
    setfaultDescriptionVal('')
  }

  return (
    <div>
        {/*  */}
        <Head>
            <title>Book Appointment</title>
        </Head>

        {/*  */}
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

        {/*  */}
        <section className='px-12 md:px-20 lg:px-32'>
          <form>
            <div className="grid gap-6 mb-6 lg:grid-cols-2 mt-6">
              <div>
                <label htmlFor="productType" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Product Type <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <select onChange={handleChange} value={productTypeVal} name="productTypeVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" id="productType">
                  <option value="">Select Product Type</option>
                  {productTypes.map((productType)=>{
                    return <option key={productType} value={productType}>{productType}</option>
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="purchasedFrom" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Purchased From <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <select onChange={handleChange} value={purchasedFromVal} name="purchasedFromVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" id="purchasedFrom">
                  <option value="">Select Purchased From</option>
                  {purchasedFromPlaces.map((purchasedFromPlace)=>{
                    return <option key={purchasedFromPlace} value={purchasedFromPlace}>{purchasedFromPlace}</option>
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="serviceType" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Service Type <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <select onChange={handleChange} value={serviceTypeVal} name="serviceTypeVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" id="serviceType">
                  <option value="">Select Service Type</option>
                  {serviceTypes.map((serviceType)=>{
                    return <option key={serviceType} value={serviceType}>{serviceType}</option>
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="custName" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Customer Name <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <input onChange={handleChange} value={customerNameVal} type="text" id="custName" name="customerNameVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="Customer's Name" />
              </div>
              <div>
                <label htmlFor="custContact" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Contact Number <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <input onChange={handleChange} value={customerContactVal} type="number" id="custContact" name="customerContactVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="Customer's Contact Number" />
              </div>
              <div>
                <label htmlFor="custEmail" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Email <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <input onChange={handleChange} value={customerEmailVal} type="text" id="custEmail" name="customerEmailVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="Customer's Email" />
              </div>
              <div>
                <label htmlFor="city" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">City <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <select onChange={handleChange} value={customerCityVal} name="customerCityVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" id="city">
                  <option value="">Select your city</option>
                  {cities.map((city)=>{
                    return <option key={city} value={city}>{city}</option>
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="custPinCode" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Pincode <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <input disabled={disableValue} onChange={handleChange} value={customerPincodeVal} type="number" id="custPinCode" name="customerPincodeVal" className={`text-sm md:text-base border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 ${disableValue?'cursor-not-allowed bg-gray-200':'bg-gray-50'}`} placeholder="Pincode" />
              </div>
              <div>
                <label htmlFor="addressLine1" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Address Line 1 <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <input disabled={disableValue} onChange={handleChange} value={customerAddressLine1Val} type="text" id="addressLine1" name="customerAddressLine1Val" className={`text-sm md:text-base border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 ${disableValue?'cursor-not-allowed bg-gray-200':'bg-gray-50'}`} placeholder="Address Line 1" />
              </div>
              <div>
                <label htmlFor="addressLine2" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Address Line 2</label>
                <input disabled={disableValue} onChange={handleChange} value={customerAddressLine2Val} type="text" id="addressLine2" name="customerAddressLine2Val" className={`text-sm md:text-base border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 ${disableValue?'cursor-not-allowed bg-gray-200':'bg-gray-50'}`} placeholder="Address Line 2" />
              </div>
              <div>
                <label htmlFor="preferredDate" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Preferred Date <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <input onChange={handleChange} value={preferredDateVal} type="date" id="preferredDate" name="preferredDateVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" />
              </div>
              <div>
                <label htmlFor="preferredTimeSlot" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Preferred Time Slot <sup className="text-red-500 text-sm md:text-base">*</sup></label>
                <select onChange={handleChange} value={preferredTimeSlotVal} name="preferredTimeSlotVal" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" id="preferredTimeSlot">
                  <option value="">Select Preferred Time Slot</option>
                  {timeSlots.map((timeSlot)=>{
                    return <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="faultDescription" className="block mb-1 lg:mb-2 text-sm md:text-base font-medium text-gray-900">Fault Description <sup className="text-red-500 text-sm md:text-base">*</sup></label>
              <textarea onChange={handleChange} value={faultDescriptionVal} name="faultDescriptionVal" id="faultDescription" cols="30" rows="5" className="text-sm md:text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="Describe the Fault"></textarea>
            </div>
            <div className='space-x-2'>
              <button className="text-white bg-black px-3 py-1 rounded-md text-sm md:text-base" onClick={submitBookAppointment}>Submit</button>
              <button className="text-white bg-black px-3 py-1 rounded-md text-sm md:text-base" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </section>

    </div>
  )
}

export default CreateAppointment