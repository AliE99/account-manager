import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AccountsController {
  public async index() {
    return await Account.all()
  }

  public async store({ request, response }: HttpContextContract) {
    // const data = request.all()
    // return await Account.create(data)

    const ValidationSchema = schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
      phone_number: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'accounts', column: 'email' }),
      ]),
      about_me: schema.string({ trim: true }),
      profile_image: schema.string({ trim: true }),
      password: schema.string({ trim: true }),
    })

    try {
      const payload = await request.validate({
        schema: ValidationSchema,
      })
      return await Account.create(payload)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const account = await Account.find(params.id)
      return account?.delete()
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      return await Account.find(params.id)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const ValidationSchema = schema.create({
      first_name: schema.string.optional({ trim: true }),
      last_name: schema.string.optional({ trim: true }),
      phone_number: schema.string.optional({ trim: true }),
      email: schema.string.optional({ trim: true }, [rules.email()]),
      about_me: schema.string.optional({ trim: true }),
      profile_image: schema.string.optional({ trim: true }),
      password: schema.string.optional({ trim: true }),
    })

    try {
      const payload = await request.validate({
        schema: ValidationSchema,
      })
      return await Boolean(Account.query().where('id', params.id).update(payload))
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
