import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {
  public async index() {
    return await Account.all()
  }

  public async store({ request }: HttpContextContract) {
    const data = request.all()
    return await Account.create(data)
  }

  public async destroy({ params }: HttpContextContract) {
    return params
  }

  public async show({ params }: HttpContextContract) {
    return params
  }

  public async update({ params }: HttpContextContract) {
    return params
  }
}
