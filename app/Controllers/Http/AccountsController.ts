import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccountsController {
  public async index() {}

  public async store({ request }: HttpContextContract) {
    const data = request.all()
    console.log(data)
  }

  public async destroy({ params }: HttpContextContract) {}

  public async show({ params }: HttpContextContract) {}

  public async update({ params }: HttpContextContract) {}

}
