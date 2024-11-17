const statistiqueService = require('../services/statistique.service');

const getStatistiqueHandler = async function(req,res){

  const getStatistique = await statistiqueService.getStatistique();
  res.json(getStatistique);
};

module.exports={

  getStatistiqueHandler
};