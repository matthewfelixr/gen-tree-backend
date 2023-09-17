'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      alias: {
        type: Sequelize.STRING
      },
      nama_kecil: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      awal_jabatan: {
        type: Sequelize.STRING
      },
      akhir_jabatan: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        type: Sequelize.DATE
      },
      tanggal_wafat: {
        type: Sequelize.DATE
      },
      alamat_makam: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      parents: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
        defaultValue: [],
      },
      children: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
        defaultValue: [],
      },
      spouses: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
        defaultValue: [],
      },
      siblings: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('People');
  }
};