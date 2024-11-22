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

export async function deleteImages({ items }) {
  return await Image.destroy({
    where: {
      ref_id: items.map((item) => item.ref_id),
      type: items.map((item) => item.type),
    },
  })
}