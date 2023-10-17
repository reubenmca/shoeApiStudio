import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const createPerson = async (req, res) => {
    try {
      await prisma.person.create({
        data: { ...req.body },
      });
  
      const newPersons = await prisma.person.findMany();
  
      return res.status(201).json({
        status: 201,
        msg: "Person successfully created",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getPersons = async (req, res) => {
    try {
      const persons = await prisma.person.findMany();
  
      if (persons.length === 0) {
        return res.status(404).json({ msg: "No persons found" });
      }
  
      return res.json({ data: persons });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getPerson = async (req, res) => {
    try {
      const person = await prisma.person.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!person) {
        return res
          .status(404)
          .json({ msg: `No person with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: person,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updatePerson = async (req, res) => {
    try {
      let person = await prisma.person.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!person) {
        return res
          .status(404)
          .json({ msg: `No person with the id: ${req.params.id} found` });
      }
  
      person = await prisma.person.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Person with the id: ${req.params.id} successfully updated`,
        data: person,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deletePerson = async (req, res) => {
    try {
      const person = await prisma.person.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!person) {
        return res
          .status(404)
          .json({ msg: `No person with the id: ${req.params.id} found` });
      }
  
      await prisma.person.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Person with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createPerson,
    getPersons,
    getPerson,
    updatePerson,
    deletePerson,
  };