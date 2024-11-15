import { Image } from '../utility/DbHelper.js'

export async function uploadMultipleImage({ items }) {
  return await Image.bulkCreate(items)
}

export async function getImageFromRefIdAndType({ ref_id, type }) {
  return await Image.findAll({
    where: {
      ref_id,
      type,
    },
  })
}
