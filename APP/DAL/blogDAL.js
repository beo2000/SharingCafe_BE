import {Blog} from '../utility/DbHelper.js';
export async function getBlogs(){
    const result = await Blog.findAll();
    return result;
}

export async function getBlog(blogId){
    const result = await Blog.findByPk(blogId);
    return result;
}

export async function createBlog(blogId, dataObj){
    return await Blog.create({
        blog_id: blogId,
        user_id: dataObj.user_id,
        title: dataObj.title,
        content: dataObj.content,
        image: dataObj.image,
        likes_count: dataObj.likes_count,
        comments_count: dataObj.comments_count,
        is_approve: dataObj.is_approve,
        is_visible: dataObj.is_visible,
        interest_id: dataObj.interest_id
    });
}

export async function updateBlog(blog, blogDetails){
    await blog.update({
        user_id: blogDetails.user_id,
        title: blogDetails.title,
        content: blogDetails.content,
        image: blogDetails.image,
        likes_count: blogDetails.likes_count,
        comments_count: blogDetails.comments_count,
        is_approve: blogDetails.is_approve,
        is_visible: blogDetails.is_visible,
        interest_id: blogDetails.interest_id
    })
    return blog;
}

export async function deleteBlog(blogId) {
    const deletedBlog = await Blog.destroy({
      where: { blog_id: blogId },
    });
    return deletedBlog;
}