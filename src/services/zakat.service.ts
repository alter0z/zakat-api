import { logger } from '../utils/logger'
import zakatModel from '../models/zakat.model'
import ZakatType from '../models/zakat.type'
import AdminType from '../models/admin.type'

export const addZakatToDB = async (payload: ZakatType) => {
  return await zakatModel.create(payload)
}

export const getZakatsFromDB = async () => {
  return await zakatModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot get data from DB')
      logger.error(err)
    })
}

export const getZakatByTypeFromDB = async (type: string) => {
  return await zakatModel
    .find({ zakat_type: type })
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot get data from DB')
      logger.error(err)
    })
}

export const getZakatByDivisionFromDB = async (division: string) => {
  return await zakatModel
    .find({ rt: division })
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot get data from DB')
      logger.error(err)
    })
}

export const getAdminDataFromDB = async () => {
  const adminData: AdminType = {
    rt01: 0,
    rt02: 0,
    rt03: 0,
    rt04: 0,
    number_of_cash_type: 0,
    number_of_rice_type: 0,
    total_cash: 0,
    total_charity_cash: 0,
    total_rice: 0,
    total_charity_rice: 0,
    total_souls: 0
  }
  return await zakatModel
    .find()
    .then((data) => {
      data.forEach((entry) => {
        const souls = entry.number_of_soul ?? 0
        if (entry.rt === '01') adminData.rt01 += souls
        if (entry.rt === '02') adminData.rt02 += souls
        if (entry.rt === '03') adminData.rt03 += souls
        if (entry.rt === '04') adminData.rt04 += souls

        if (entry.zakat_type === 'Uang') {
          adminData.number_of_cash_type += 1 * souls
          adminData.total_cash += (entry.amount ?? 0) + entry.charity
          adminData.total_charity_cash += entry.charity
        } else if (entry.zakat_type === 'Beras') {
          adminData.number_of_rice_type += 1 * souls
          adminData.total_rice += (entry.amount ?? 0) + entry.charity
          adminData.total_charity_rice += entry.charity
        }

        adminData.total_souls += souls
      })
      return adminData
    })
    .catch((err) => {
      logger.info('Cannot get data from DB')
      logger.error(err)
    })
}
