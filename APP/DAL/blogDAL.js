import {
  Blog,
  SequelizeInstance,
  Comment,
  LikeBlog,
} from '../utility/DbHelper.js';

export async function getBlogs(page, title) {
  let name = title;
  if (name == null) {
    name = '';
  }
  let sqlQuery = '';
  if (page) {
    sqlQuery = `
    select 
      b.*, u.user_name, i.name, u.profile_avatar
    from 
      blog b 
    join 
      interest i 
      on 1=1 
      and b.interest_id = i.interest_id
    join
      "user" u
      on u.user_id = b.user_id
    where b.title like '%${name}%'
    AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
    offset ((${page} - 1 ) * 10) rows 
    fetch next 10 rows only
    `;
  } else {
    sqlQuery = `
    select 
      b.*, u.user_name, i.name, u.profile_avatar
    from 
      blog b 
    join 
      interest i 
      on 1=1 
      and b.interest_id = i.interest_id
    join
      "user" u
    on u.user_id = b.user_id
    where b.title like '%${name}%'
    AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
  `;
  }
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getBlog(blogId) {
  const sqlQuery = `
  select 
    b.*, u.user_name, u.profile_avatar, i.name
  from 
    blog b 
  join 
    interest i 
    on 1=1 
    and b.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = b.user_id
   where b.blog_id = '${blogId}'
   AND NOT EXISTS (
    SELECT 1
    FROM public.user_block
    WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
        OR (blocker_id = b.user_id AND blocked_id = u.user_id)
  )
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function isUserLikeBlog(blogId, loggedUserId) {
  const sqlQuery = `
  select 
    * 
  from 
    like_blog 
  where 
    blog_id = '${blogId}' 
    and user_id = '${loggedUserId}'
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
    contetn: dataObj.content,
    image: dataObj.image,
    likes_count: 0,
    comments_count: 0,
    is_approve: true,
    is_visible: true,
    interest_id: dataObj.interest_id,
  });
}

export async function updateBlog(blogId, blogDetails) {
  return await Blog.update(
    {
      user_id: blogDetails.user_id,
      title: blogDetails.title,
      content: blogDetails.content,
      image: blogDetails.image,
      likes_count: blogDetails.likes_count,
      comments_count: blogDetails.comments_count,
      is_visible: blogDetails.is_visible,
      interest_id: blogDetails.interest_id,
    },
    {
      where: { blog_id: blogId },
    },
  );
}

export async function deleteBlog(blogId) {
  const deletedBlog = await Blog.destroy({
    where: { blog_id: blogId },
  });
  return deletedBlog;
}

export async function updateImg(blogId, fileData) {
  return await Blog.update(
    {
      image: fileData?.path,
    },
    {
      where: { blog_id: blogId },
    },
  );
}

export async function getNewBlogs(page) {
  let sqlQuery = '';
  if (page) {
    sqlQuery = `
    select 
      b.*, u.user_name, i.name, u.profile_avatar
    from 
      blog b 
    join 
      interest i 
      on 1=1 
      and b.interest_id = i.interest_id
    join
      "user" u
      on u.user_id = b.user_id
    where b.is_approve = true and b.is_visible = true
    AND NOT EXISTS (
    SELECT 1
    FROM public.user_block
    WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
        OR (blocker_id = b.user_id AND blocked_id = u.user_id)
  )
    order by b.created_at desc 
    offset ((${page} - 1 ) * 10) rows 
    fetch next 10 rows only
  `;
  } else {
    sqlQuery = `
    select 
      b.*, u.user_name, i.name, u.profile_avatar
    from 
      blog b 
    join 
      interest i 
      on 1=1 
      and b.interest_id = i.interest_id
    join
      "user" u
      on u.user_id = b.user_id
    where b.is_approve = true and b.is_visible = true
    AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
    order by b.created_at desc 
  `;
  }

  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getPopularBlogs(page) {
  let sqlQuery = '';
  if (page) {
    sqlQuery = `
    select 
      b.*, u.user_name, i.name, u.profile_avatar
    from 
      blog b 
    join 
      interest i 
      on 1=1 
      and b.interest_id = i.interest_id
    join
      "user" u
      on u.user_id = b.user_id
    where b.is_approve = true and b.is_visible = true
    AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
    order by b.likes_count desc
    offset ((${page} - 1 ) * 10) rows 
    fetch next 10 rows only
  `;
  } else {
    sqlQuery = `
    select 
      b.*, u.user_name, i.name, u.profile_avatar
    from 
      blog b 
    join 
      interest i 
      on 1=1 
      and b.interest_id = i.interest_id
    join
      "user" u
    on u.user_id = b.user_id
    where b.is_approve = true and b.is_visible = true
    AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
    order by b.likes_count desc 
  `;
  }

  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function searchByName(title) {
  const sqlQuery = `
  select 
    b.*, u.user_name, i.name
  from 
    blog b 
  join 
    interest i 
    on 1=1 
    and b.interest_id = i.interest_id
  join
    "user" u
    on u.user_id = b.user_id
  where b.title like '%${title}%'
  AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getComments(blogId) {
  const sqlQuery = `
  select 
    c.comment_id , c."content", c.parent_comment_id, u.user_id ,u.user_name , u.profile_avatar
  from 
 	"comment" c
  join
 	  "user" u 
 	  on u.user_id = c.user_id
  join 
 	  blog b 
 	  on b.blog_id = c.blog_id 
  where c.blog_id = '${blogId}'
  AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createComment(comment_id, dataObj) {
  const sqlQuery = `
  UPDATE blog 
  SET comments_count = comments_count + 1
  WHERE blog_id = '${dataObj.blogId}'
`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return await Comment.create({
    comment_id: comment_id,
    blog_id: dataObj.blogId,
    user_id: dataObj.userId,
    content: dataObj.content,
    parent_comment_id: dataObj.parent_comment_id,
  });
}

export async function getComment(commentId) {
  const sqlQuery = `
  select 
 	  c.*, u.user_name , u.profile_avatar 
  from
 	  "comment" c 
  join
 	  blog b 
 	  on b.blog_id = c.blog_id 
  join 
 	  "user" u 
 	  on c.user_id = u.user_id 
  where c.comment_id = '${commentId}'
  AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function updateComment(commentId, content) {
  return await Comment.update(
    {
      content: content,
    },
    {
      where: { comment_id: commentId },
    },
  );
}

export async function likeBlog(like_blog_id, dataObj) {
  const sqlQuery = `
    UPDATE blog 
    SET likes_count = likes_count + 1
    WHERE blog_id = '${dataObj.blog_id}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return await LikeBlog.create({
    like_blog_id: like_blog_id,
    user_id: dataObj.user_id,
    blog_id: dataObj.blog_id,
  });
}

export async function unlikeBlog(dataObj) {
  const sqlQuery = `
    UPDATE blog 
    SET likes_count = likes_count - 1
    WHERE blog_id = '${dataObj.blog_id}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  const deletedLikeBlog = await LikeBlog.destroy({
    where: { like_blog_id: dataObj.like_blog_id },
  });
  return deletedLikeBlog;
}

export async function deleteComment(commentId, blogId) {
  const deletedComment = await Comment.destroy({
    where: { comment_id: commentId },
  });
  const sqlQuery = `
    UPDATE blog 
    SET comments_count = comments_count - 1
    WHERE blog_id = '${blogId}'
    `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return deletedComment;
}

export async function getUserBlog(page, title) {
  let name = title;
  if (name == null) {
    name = '';
  }
  let sqlQuery = '';
  if (page) {
    sqlQuery = `
    select 
      b.*, u.user_name, i.name, u.profile_avatar
    from 
      blog b 
    join 
      interest i 
      on 1=1 
      and b.interest_id = i.interest_id
    join
      "user" u
      on u.user_id = b.user_id
    where b.title like '%${name}%' and b.is_approve = true and b.is_visible = true
    AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
    offset ((${page} - 1 ) * 10) rows 
    fetch next 10 rows only
    `;
  } else {
    sqlQuery = `
    select 
      b.*, u.user_name, i.name, u.profile_avatar
    from 
      blog b 
    join 
      interest i 
      on 1=1 
      and b.interest_id = i.interest_id
    join
      "user" u
    on u.user_id = b.user_id
    where b.title like '%${name}%' and b.is_approve = true and b.is_visible = true
    AND NOT EXISTS (
      SELECT 1
      FROM public.user_block
      WHERE (blocker_id = u.user_id AND blocked_id = b.user_id)
          OR (blocker_id = b.user_id AND blocked_id = u.user_id)
    )
  `;
  }
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function getMyBlogs(userId) {
  const sqlQuery = `
  select 
	  b.blog_id,
	  u.user_name,
	  b.title,
	  b."content",
	  b.likes_count,
	  b.comments_count,
	  b.image,
	  b.is_approve,
	  b.is_visible,
	  i."name",
	  b.created_at 
  from blog b 
  left join "user" u 
  on u.user_id = b.user_id
  left join interest i 
  on b.interest_id = i.interest_id 
  where u.user_id = '${userId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
