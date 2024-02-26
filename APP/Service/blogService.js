import * as blogDAL from '../DAL/blogDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function getBlogs(){
    return await blogDAL.getBlogs();
}

export async function getBlog(blogId){
    return await blogDAL.getBlog(blogId);
}

export async function createBlog(dataObj){
    const blog_id = uuidv4();
    return await blogDAL.createBlog(blog_id, dataObj);
}