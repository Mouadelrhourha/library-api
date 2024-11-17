const statistiqueRepository =require('../repositories/statistique.repository');

const getStatistique = async function(){

  return statistiqueRepository.findStatistique();

};

module.exports={

  getStatistique
};