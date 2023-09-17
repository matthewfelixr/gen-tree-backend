"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // People.hasOne(models.People,{
      //   foreignKey:{ name:'mother_id', allowNull: true },
      //   as:"mother"
      // })
      // People.hasOne(models.People,{
      //   foreignKey:{ name:'father_id', allowNull: true },
      //   as:'father'
      // })
      // People.hasMany(models.People,{
      //   foreignKey:{ name:'child_id', allowNull: true },
      //   as:'child'
      // }) -> Issue : Needs solution to associate to an Array
    }
  }
  People.init(
    {
      nama: DataTypes.STRING,
      alias: DataTypes.STRING,
      nama_kecil:DataTypes.STRING,
      jabatan:DataTypes.STRING,
      awal_jabatan:DataTypes.STRING,
      akhir_jabatan:DataTypes.STRING,
      gender: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATEONLY,
      tanggal_wafat: DataTypes.DATEONLY,
      alamat_makam: DataTypes.STRING,
      alamat: DataTypes.STRING,
      parents: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        defaultValue: [],
        get() {
          const value = this.getDataValue('parents');
          return value ? value : [];
        },
        set(value) {
          if (Array.isArray(value)) {
            this.setDataValue('parents', value);
          } else if (value === null || value === undefined) {
            this.setDataValue('parents', []);
          } else {
            throw new Error('Invalid value for parents. Expected an array.');
          }
        },    
      },
      children: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        defaultValue: [],
        get() {
          const value = this.getDataValue('children');
          return value ? value : [];
        },
        set(value) {
          if (Array.isArray(value)) {
            this.setDataValue('children', value);
          } else if (value === null || value === undefined) {
            this.setDataValue('children', []);
          } else {
            throw new Error('Invalid value for children. Expected an array.');
          }
        },    
      },
      spouses: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        defaultValue: [],
        get() {
          const value = this.getDataValue('spouses');
          return value ? value : [];
        },
        set(value) {
          if (Array.isArray(value)) {
            this.setDataValue('spouses', value);
          } else if (value === null || value === undefined) {
            this.setDataValue('spouses', []);
          } else {
            throw new Error('Invalid value for spouses. Expected an array.');
          }
        },    
      },
      siblings: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        defaultValue: [],
        get() {
          const value = this.getDataValue('siblings');
          return value ? value : [];
        },
        set(value) {
          if (Array.isArray(value)) {
            this.setDataValue('siblings', value);
          } else if (value === null || value === undefined) {
            this.setDataValue('siblings', []);
          } else {
            throw new Error('Invalid value for siblings. Expected an array.');
          }
        },    
      },
    },
    {
      sequelize,
      modelName: "People",
    }
  );

    return People;
};

    // children: {
    //   type: DataTypes.ARRAY(DataTypes.JSON),
    //   defaultValue: [],
    // },
    // spouses: {
    //   type: DataTypes.ARRAY(DataTypes.JSON),
    //   defaultValue: [],
    // },
    // parents: DataTypes.ARRAY(DataTypes.JSON),
    // children: DataTypes.ARRAY(DataTypes.JSON),
    // spouses: DataTypes.ARRAY(DataTypes.JSON),
    // siblings: DataTypes.ARRAY(DataTypes.JSON)
    // father_id: DataTypes.INTEGER,
    // mother_id: DataTypes.INTEGER,
    // child_id: DataTypes.ARRAY(DataTypes.STRING), //Later to do parseInt
    // spouse_id:DataTypes.ARRAY(DataTypes.STRING), //Later to do parseInt
    // {
    //   parents: {
    //     type: DataTypes.ARRAY(DataTypes.JSON),
    //     defaultValue: [],
    //   },
    // },
    // {
    //   children: {
    //     type: DataTypes.ARRAY(DataTypes.JSON),
    //     defaultValue: [],
    //   },
    // },
    // {
    //   spouses: {
    //     type: DataTypes.ARRAY(DataTypes.JSON),
    //     defaultValue: [],
    //   },
    // },
    // {
    //   siblings: {
    //     type: DataTypes.ARRAY(DataTypes.JSON),
    //     defaultValue: [],
    //   },
    // },
