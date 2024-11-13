import Joi from 'joi'
import ZakatType from '../models/zakat.type'

export const createZakatValidation = (payload: ZakatType) => {
  const schema = Joi.object({
    zakat_id: Joi.string().required(),
    name: Joi.string().required(),
    rt: Joi.string().required(),
    zakat_type: Joi.string().required(),
    number_of_soul: Joi.number().required(),
    amount: Joi.number().required(),
    charity: Joi.number().allow(0)
  })

  return schema.validate(payload)
}
