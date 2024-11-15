import * as ImageDAL from '../DAL/imageDAL.js'

export async function uploadMultipleImage({ items }) {
  return await ImageDAL.uploadMultipleImage({ items })
}

export async function getImageFromRefIdAndType({ ref_id, type }) {
  return await ImageDAL.getImageFromRefIdAndType({ ref_id, type })
}
