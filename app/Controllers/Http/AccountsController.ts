import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccountsController {
  public async index() {}

  public async store({ request }: HttpContextContract) {
    const data = request.all()
    console.log(data)
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
