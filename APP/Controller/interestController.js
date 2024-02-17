import express from 'express';
import * as interestService from '../Service/interestService.js';

export async function getInterests(req, res) {
  try {
    const result = interestService.getInterests();
    res.status(200).send(result);
  } catch (e) {
    console.log(error);
    res.status(404).send(error);
  }
}

export async function createInterest(req, res) {
  const t = await SequelizeInstance.transaction();
  try {
    const interestDetails = req.body;
    const interest = await interestService.createInterest(interestDetails);
    res.status(200).send(interest);
    await t.commit();
  } catch (e) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}

export async function updateInterest(req, res) {
  const t = await SequelizeInstance.transaction();
  try {
    const interestId = req.params.interestId;
    const interestDetails = req.body;
    const interest = await interestService.updateInterest(
      interestId,
      interestDetails,
    );
    res.status(200).send(interest);
    await t.commit();
  } catch (e) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}

export async function deleteInterest(req, res) {
  const t = await SequelizeInstance.transaction();
  try {
    const interestId = req.params.interestId;
    const interest = await interestService.deleteInterest(interestId);
    res.status(200).send(interest);
    await t.commit();
  } catch (e) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}
