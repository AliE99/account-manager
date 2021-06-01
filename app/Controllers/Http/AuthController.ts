import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const ValidationSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }),
    })
    const validatedData = await request.validate({ schema: ValidationSchema })
    const token = await auth.use('api').attempt(validatedData.email, validatedData.password, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }

  public async register({ request, auth }: HttpContextContract) {
    const ValidationSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }),
    })
    const validatedData = await request.validate({ schema: ValidationSchema })
    const newUser = await User.create(validatedData)
    const token = await auth.use('api').login(newUser, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }
}
