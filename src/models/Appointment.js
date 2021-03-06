const {Schema , model} =  require('mongoose')

const AppointmentSchema  = new Schema({
    patient : {
        type:String ,
        required : true
    },
    timeAppointment : {
        type: String,
        required : true
    },
    dateAppointment : {
      type: Date,
      required: true
    },
    description : {
        type:String
    },
    user: {
        type: String,
        required : true
    }
},{
    timestamps : true
})

//nombre del modelo
module.exports = model('Appointment',AppointmentSchema)

