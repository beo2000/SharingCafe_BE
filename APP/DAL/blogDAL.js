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
        is_approve: dataObj.is_approve
    });
}