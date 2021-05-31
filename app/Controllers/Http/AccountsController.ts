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
    const account = await Account.find(params.id)
    account?.delete()
  }

  public async show({ params }: HttpContextContract) {
    return await Account.find(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    await Account.query().where('id', params.id).update(request.all())
  }
}
