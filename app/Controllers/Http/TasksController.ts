import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
  public async index() {
    return await Task.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const ValidationSchema = schema.create({
      name: schema.string({ trim: true }),
      priority: schema.enum(['high', 'medium', 'low']),
      user_id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
    })

    try {
      const payload = await request.validate({
        schema: ValidationSchema,
      })
      return await Task.create(payload)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const task = await Task.find(params.id)
      return task?.delete()
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      return await Task.find(params.id)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const ValidationSchema = schema.create({
      name: schema.string.optional({ trim: true }),
      priority: schema.enum.optional(['high', 'medium', 'low']),
      user_id: schema.number.optional([rules.exists({ table: 'users', column: 'id' })]),
    })

    try {
      const payload = await request.validate({
        schema: ValidationSchema,
      })

      return await Task.query().where('id', params.id).update(payload)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
