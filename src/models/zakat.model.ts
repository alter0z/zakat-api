import mongoose from 'mongoose'

export const ZakatSchema = new mongoose.Schema(
  {
    zakat_id: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    rt: {
      type: String
    },
    zakat_type: {
      type: String
    },
    number_of_soul: {
      type: Number
    },
    amount: {
      type: Number
    },
    charity: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const zakatModel = mongoose.model('zakat', ZakatSchema)
export default zakatModel
