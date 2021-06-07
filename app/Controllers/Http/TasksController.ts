import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TasksController {
  public async index({ request }: HttpContextContract) {
    const search = request.qs().search
    const page = request.qs().page || 1
    const page_size = request.qs().page_size || 10
    const sort = request.qs().sort || 'created_at'
    const sort_type = request.qs().sort_type || 'asc'

    if (search == null) {
      const tasks = await Database.from('tasks').orderBy(sort, sort_type).paginate(page, page_size)
      return tasks.toJSON().data
    } else {
      return Task.query().where('name', 'ilike', '%' + search + '%')
    }
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
