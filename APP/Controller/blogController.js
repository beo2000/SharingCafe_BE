import * as blogService from '../Service/blogService.js';
export async function getBlogs(req, res) {
    try{
        const result = await blogService.getBlogs();
        res.status(200).send(result);
    } catch (error){
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

export async function getBlog(req, res){
    try {
        const blogId = req.params.blogId;
        const result = await blogService.getBlog(blogId);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}

export async function createBlog(req, res){
    try {
        const dataObj = req.body;
        const result = await blogService.createBlog(dataObj);
        res.status(200).send(result);
    } catch (error){
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}