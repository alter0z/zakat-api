import { Application, Router } from 'express'
import { ZakatRouter } from './zakat.router'

const _routes: Array<[string, Router]> = [['/zakat', ZakatRouter]]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [path, router] = route
    app.use(path, router)
  })
}
