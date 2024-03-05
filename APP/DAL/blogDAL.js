import { Blog, SequelizeInstance } from '../utility/DbHelper.js';
export async function getBlogs() {
  const sqlQuery = `
  select 
    * 
  from 
    blog b 
  left join 
    interest i 
    on 1=1 
    and b.interest_id = i.interest_id
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getBlog(blogId) {
  const sqlQuery = `
  select 
    * 
  from 
    blog b 
  left join 
    interest i 
    on 1=1 
    and b.interest_id = i.interest_id
   where b.blog_id = '${blogId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createBlog(blogId, dataObj) {
  return await Blog.create({
    blog_id: blogId,
    user_id: dataObj.user_id,
    title: dataObj.title,
    content: dataObj.content,
    image: dataObj.image,
    likes_count: dataObj.likes_count,
    comments_count: dataObj.comments_count,
    is_approve: dataObj.is_approve,
    interest_id: dataObj.interest_id,
  });
}

export async function updateBlog(blog, blogDetails) {
  await blog.update({
    user_id: blogDetails.user_id,
    title: blogDetails.title,
    content: blogDetails.content,
    image: blogDetails.image,
    likes_count: blogDetails.likes_count,
    comments_count: blogDetails.comments_count,
    is_approve: blogDetails.is_approve,
  });
  return blog;
}

export async function deleteBlog(blogId) {
  const deletedBlog = await Blog.destroy({
    where: { blog_id: blogId },
  });
  return deletedBlog;
}
