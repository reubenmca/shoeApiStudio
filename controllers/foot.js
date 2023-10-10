import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const createFoot = async (req, res) => {
    try {
      await prisma.foot.create({
        data: { ...req.body },
      });
  
      const newFoots = await prisma.foot.findMany();
  
      return res.status(201).json({
        msg: "Foot successfully created",
        data: newFoots,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getFoots = async (req, res) => {
    try {
      const foots = await prisma.foot.findMany();
  
      if (foots.length === 0) {
        return res.status(404).json({ msg: "No foots found" });
      }
  
      return res.json({ data: foots });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getFoot = async (req, res) => {
    try {
      const foot = await prisma.foot.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!foot) {
        return res
          .status(404)
          .json({ msg: `No foot with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: foot,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateFoot = async (req, res) => {
    try {
      let foot = await prisma.foot.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!foot) {
        return res
          .status(404)
          .json({ msg: `No foot with the id: ${req.params.id} found` });
      }
  
      foot = await prisma.foot.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Foot with the id: ${req.params.id} successfully updated`,
        data: foot,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteFoot = async (req, res) => {
    try {
      const foot = await prisma.foot.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!foot) {
        return res
          .status(404)
          .json({ msg: `No foot with the id: ${req.params.id} found` });
      }
  
      await prisma.foot.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Foot with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createFoot,
    getFoots,
    getFoot,
    updateFoot,
    deleteFoot,
  };