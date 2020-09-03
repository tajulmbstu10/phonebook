import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(?:\+?88)?01[135-9]\d{8}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    },
});

const contactModel = mongoose.model("Contact", contactSchema);

export default contactModel;
