import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const page = request.qs().page || 1
    const page_size = request.qs().page_size || 10
    const users = await Database.from('users').paginate(page, page_size)
    return users.toJSON().data
  }
}
