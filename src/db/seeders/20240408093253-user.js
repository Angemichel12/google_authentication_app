module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = [
      { 
        name: 'KWIZERA Bonheur', 
        email: 'kwizera@gmail.com', 
        profile: 'https://res.cloudinary.com/dt7chsxsa/image/upload/v1711547144/Blogs/278c5f30d818e5fe53c1f027efe0d2a1_se3ud7.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'Ange michel', 
        email: 'ange@gmail.com', 
        profile: 'https://res.cloudinary.com/dt7chsxsa/image/upload/v1711547144/Blogs/278c5f30d818e5fe53c1f027efe0d2a1_se3ud7.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'Aphrodis', 
        email: 'Aphrodis@gmail.com', 
        profile: 'https://res.cloudinary.com/dt7chsxsa/image/upload/v1711547144/Blogs/278c5f30d818e5fe53c1f027efe0d2a1_se3ud7.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'Jacky', 
        email: 'jacky@gmail.com', 
        profile: 'https://res.cloudinary.com/dt7chsxsa/image/upload/v1711547144/Blogs/278c5f30d818e5fe53c1f027efe0d2a1_se3ud7.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Users', seedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
