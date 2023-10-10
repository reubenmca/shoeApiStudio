const createShoe = async (req, res) => {
    try {
      await prisma.shoe.create({
        data: { ...req.body },
      });
  
      const newShoes = await prisma.shoe.findMany();
  
      return res.status(201).json({
        msg: "Shoe successfully created",
        data: newShoes,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getShoes = async (req, res) => {
    try {
      const shoes = await prisma.shoe.findMany();
  
      if (shoes.length === 0) {
        return res.status(404).json({ msg: "No shoes found" });
      }
  
      return res.json({ data: shoes });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getShoe = async (req, res) => {
    try {
      const shoe = await prisma.shoe.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!shoe) {
        return res
          .status(404)
          .json({ msg: `No shoe with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: shoe,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateShoe = async (req, res) => {
    try {
      let shoe = await prisma.shoe.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!shoe) {
        return res
          .status(404)
          .json({ msg: `No shoe with the id: ${req.params.id} found` });
      }
  
      shoe = await prisma.shoe.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Shoe with the id: ${req.params.id} successfully updated`,
        data: shoe,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteShoe = async (req, res) => {
    try {
      const shoe = await prisma.shoe.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!shoe) {
        return res
          .status(404)
          .json({ msg: `No shoe with the id: ${req.params.id} found` });
      }
  
      await prisma.shoe.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Shoe with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createShoe,
    getShoes,
    getShoe,
    updateShoe,
    deleteShoe,
  };