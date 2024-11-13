import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { createZakatValidation } from '../validations/zakat.validation'
import {
  addZakatToDB,
  getAdminDataFromDB,
  getZakatByDivisionFromDB,
  getZakatByTypeFromDB,
  getZakatsFromDB
} from '../services/zakat.service'
import { logger } from '../utils/logger'
import { cash, rice } from '../configs/environment'

export const createZakat = async (req: Request, res: Response) => {
  req.body.zakat_id = uuidv4()
  if (req.body.zakat_type === 'Uang') req.body.amount = cash * req.body.number_of_soul
  else req.body.amount = rice * req.body.number_of_soul
  const { error, value } = createZakatValidation(req.body)
  if (error) {
    logger.error('ERR: create zakat = ', error.details[0].message)
    res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } else
    try {
      await addZakatToDB(value)
      logger.info('Success add new zakat')
      res.status(201).send({ status: true, statusCode: 201, message: 'Add Zakat Success' })
    } catch (err) {
      logger.error('ERR: create zakat = ', err)
      res.status(422).send({ status: false, statusCode: 422, message: err })
    }
}

export const getZakats = async (req: Request, res: Response) => {
  const zakats = await getZakatsFromDB()
  if (!zakats) res.status(404).send({ status: false, statusCode: 404, message: 'Zakat not found', data: {} })
  else res.status(200).send({ status: true, statusCode: 200, data: zakats })
}

export const getZakatByType = async (req: Request, res: Response) => {
  const zakat = await getZakatByTypeFromDB(req.query.type as string)
  if (!zakat) res.status(404).send({ status: false, statusCode: 404, message: 'Zakat not found', data: {} })
  else res.status(200).send({ status: true, statusCode: 200, data: zakat })
}

export const getZakatByDivision = async (req: Request, res: Response) => {
  const zakat = await getZakatByDivisionFromDB(req.query.div as string)
  if (!zakat) res.status(404).send({ status: false, statusCode: 404, message: 'Zakat not found', data: {} })
  else res.status(200).send({ status: true, statusCode: 200, data: zakat })
}

export const getAdminData = async (req: Request, res: Response) => {
  const data = await getAdminDataFromDB()
  if (!data) res.status(404).send({ status: false, statusCode: 404, message: 'Zakat not found', data: {} })
  else res.status(200).send({ status: true, statusCode: 200, data: data })
}
