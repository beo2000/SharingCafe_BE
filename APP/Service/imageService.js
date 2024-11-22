import * as ImageDAL from '../DAL/imageDAL.js'

export async function uploadMultipleImage({ items }) {
  await ImageDAL.deleteImages({ items })
  return await ImageDAL.uploadMultipleImage({ items })
}

export async function deleteImages({ ref_ids }) {
  return await ImageDAL.deleteImages({ ref_ids })
}

export async function getImageFromRefIdAndType({ ref_id, type }) {
  return await ImageDAL.getImageFromRefIdAndType({ ref_id, type })
}
