import { Router } from 'express'
import {
  createZakat,
  getAdminData,
  getZakatByDivision,
  getZakatByType,
  getZakats
} from '../controllers/zakat.controller'

export const ZakatRouter: Router = Router()

ZakatRouter.post('/', createZakat)
ZakatRouter.get('/', getZakats)
ZakatRouter.get('/type', getZakatByType)
ZakatRouter.get('/division', getZakatByDivision)
ZakatRouter.get('/admin', getAdminData)
