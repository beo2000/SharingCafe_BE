import { Discuss } from '../utility/DbHelper.js'

export async function createDiscuss(discuss) {
  return await Discuss.create(discuss)
}

export async function getDiscuss(query) {
  return await Discuss.findAll(
    {
      where: query,
    }
  )
}
