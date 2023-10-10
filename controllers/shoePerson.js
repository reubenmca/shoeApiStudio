import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const createShoePerson = async (req, res) => {
    try {
      await prisma.shoeperson.create({
        data: { ...req.body },
      });
  
      const newShoePersons = await prisma.shoeperson.findMany();
  
      return res.status(201).json({
        msg: "ShoePerson successfully created",
        data: newShoePersons,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getShoePersons = async (req, res) => {
    try {
      const shoepersons = await prisma.shoeperson.findMany();
  
      if (shoepersons.length === 0) {
        return res.status(404).json({ msg: "No shoepersons found" });
      }
  
      return res.json({ data: shoepersons });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getShoePerson = async (req, res) => {
    try {
      const shoeperson = await prisma.shoeperson.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!shoeperson) {
        return res
          .status(404)
          .json({ msg: `No shoeperson with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: shoeperson,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateShoePerson = async (req, res) => {
    try {
      let shoeperson = await prisma.shoeperson.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!shoeperson) {
        return res
          .status(404)
          .json({ msg: `No shoeperson with the id: ${req.params.id} found` });
      }
  
      shoeperson = await prisma.shoeperson.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `ShoePerson with the id: ${req.params.id} successfully updated`,
        data: shoeperson,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteShoePerson = async (req, res) => {
    try {
      const shoeperson = await prisma.shoeperson.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!shoeperson) {
        return res
          .status(404)
          .json({ msg: `No shoeperson with the id: ${req.params.id} found` });
      }
  
      await prisma.shoeperson.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `ShoePerson with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createShoePerson,
    getShoePersons,
    getShoePerson,
    updateShoePerson,
    deleteShoePerson,
  };