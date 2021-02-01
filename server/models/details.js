import mongoose from 'mongoose';

const detailSchema = mongoose.Schema({
      
      payment_type: String,
      beneficiary_entity_type: String,
      fields: {
        beneficiary_company_name: Number,
        beneficiary_last_name: Number,
        beneficiary_address: Number,
        iban: String,
        beneficiary_city: Number,
        beneficiary_first_name: Number,
        bic_swift: String
      }
})

const details = mongoose.model('details', detailSchema);
export default details;