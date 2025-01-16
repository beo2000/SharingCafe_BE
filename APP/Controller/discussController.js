import * as discussService from '../Service/discussService.js'

export async function createDiscuss(req, res) {
  try {
    const result = await discussService.createDiscuss(req.body, req.user)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message })
  }
}

export async function getDiscuss(req, res) {
  try {
    const result = await discussService.getDiscuss(req.query, req.user)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message })
  }
}

export async function commentDiscussion(req, res) {
  try {
    const result = await discussService.commentDiscussion(req.body.discuss_id, req.body.content, req.user)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message })
  }
}

export async function getComments(req, res, next) {
  try {
    const result = await discussService.getComments(req.query.discuss_id)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message })
  }
}

export async function likeDiscuss(req, res) {
  try {
    const result = await discussService.likeDiscuss(req.body.discuss_id, req.user, req.body.is_like)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message })
  }
}