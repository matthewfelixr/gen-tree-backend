const People = require("../models").People;
const response = require("../helper/macro");
const { sequelize, Sequelize } = require("../models");

const parent = async (id, newId) => {
  try {
    // fungsi untuk melakukan update relasi dengan parent baru
    let existingParent = [];
    let existingChildren = []
    const result1 = await People.findOne({ where: { id: id } });
    console.log("result1.parents: "+ result1.parents);
    if (result1.parents !== undefined) {existingParent = result1.parents.slice();}
    console.log("parent.length: ", existingParent.length);
    
    // console.log("helloo");
    const updatedMember1 = await People.update(
      { parents: [...existingParent, { id: newId }] },
      {
        where: {
          id: id,
        },
      }
    );
      console.log(updatedMember1);
      
    const updatedMember2 = await People.update(
      { children: [...existingChildren  , {id:id}] },
      {
        where: {
          id: newId,
        },
      }
    );
    console.log(updatedMember2);

    // update parents spouse

    let parentSpouse =[]
    console.log("Finding Existing parent's spouse:")
    console.log(result1.parents)
    if(result1.parents !== undefined) {
      parentSpouse = result1.parents.slice()
      console.log(parentSpouse[0])
      for(let i = 0; i < parentSpouse.length; i++){
        const updatedParents1 = await People.update(
          {spouses: [...parentSpouse]},
          {where:{
            id: newId
          },
        }
        )

        const updatedParents2 = await People.update(
          {spouses : [{id: newId}]},
          {
            where:{
              id: parentSpouse[i].id
            }
          }
        )
      }
    }
    
    
    // update parents for existing children's sibling
    let existingSibling=[]
    console.log("Finding existing sibling :"+result1.siblings)
    console.log(result1.siblings)
    console.log(id)
    if(result1.siblings !== undefined){
     existingSibling = result1.siblings.slice()
     console.log(existingSibling[0])
     for(let i = 0; i < existingSibling.length;i++){
      //updating root sibling's parents
      const updatedMember3 = await People.update(
        { parents: [...existingParent  , {id:newId}] },
      {
        where: {
          id: existingSibling[i].id,
        },
      }
      )
      console.log("iterations number:")
      console.log(i)  
      console.log(updatedMember3)
      const updatedMember4 = await People.update(
        //updating root sibling's parents
        { children: [...existingSibling  , {id:id }] },
      {
        where: {
          id: newId,
        },
      }
      )
      console.log(updatedMember4)
     }
    }
    
      
      
      } catch (error) {
        console.error(error)
      }
};
const children = async (id, newId) => {
  try {
    // fungsi untuk melakukan update relasi dengan children baru
    let existingChildren = [];
    let existingParent = [];
    let existingChildFromSpouse =[];
    const result1 = await People.findOne({ where: { id: id } });
    console.log("result1.children: "+ result1.children);
    if (result1.children !== undefined) {existingChildren = result1.children.slice();}
    console.log("children.length: ", existingChildren.length);
    const result2 = await People.findOne({where:{id:id}})
    if(result2.spouses!== undefined) {existingParent = result2.spouses.slice();}

    
    console.log("helloo");
    const updatedMember1 = await People.update(
      { children: [...existingChildren, { id: newId }] },
      {
        where: {
          id: id,
        },
      }
      );
      console.log(updatedMember1);
      
      const updatedMember2 = await People.update(
        { parents: [...existingParent  , {id:id}] },
        {
          where: {
            id: newId,
          },
        }
        );
      console.log(updatedMember2);

      
      for (let i = 0; i< existingParent.length; i++){
        const result3 = await People.findOne({where:{id:existingParent[i].id}})
        if(result3.children !== undefined) {existingChildFromSpouse = result3.children.slice()}
        const updatedMember3 = await People.update(
          { children: [...existingChildFromSpouse, {id:newId}]},
          {
            where:{
              id:existingParent[i].id
            },
          }
        )
      }
    
    let existingSibling =[]
    // const result2 = await People.findOne({where: {id:result1.children}})
    console.log("Finding existing sibling :")
    console.log(result1.children)

    if(result1.children !== undefined){
      existingSibling = result1.children.slice();
      const updatedMember3 = await People.update(
        { siblings: [...existingSibling]},
        {
          where:{
            id:newId
          },
        }
      )
    const newIds=[10]
    const updatedChildren = await People.findOne({where:{id:id}})
    if(updatedChildren.children !== undefined){
      existingSibling = updatedChildren.children.slice()
      console.log(existingSibling)
    }
      for(let i = 0;i<existingSibling.length;i++){
        console.log(i)
        console.log(existingSibling[i])
        let siblings = existingSibling.filter(obj => obj.id !== existingSibling[i].id)
        console.log("filtered")
        console.log(siblings)
        // let currentSibling = await People.findOne({where:{id:existingSibling[i].id}})
        const updatedMember4 = await People.update(
          // { siblings: Sequelize.fn('array_append', Sequelize.col('siblings'), {newIds})},
          { siblings: [...siblings] },
          {
            where:{
              id:existingSibling[i].id
            }
          }
        ); console.log(existingSibling[i]); 
      }
    }

      } catch (error) {
        console.error(error)
      }
};
const sibling = async (id, newId) => {
  try {
    // fungsi untuk melakukan update relasi dengan children baru
    let existingSibling = [];
    let addedSibling = [];
    let currentChild = [];
    const result1 = await People.findOne({ where: { id: id } });
    console.log("result1.siblings: "+ result1.siblings);
    if (result1.siblings !== undefined) {existingSibling = result1.siblings.slice();}
    console.log("siblings.length: ", existingSibling.length);
    
    console.log("helloo");
    
    const updatedMember1 = await People.update(
      { siblings: [...existingSibling, { id: id }] },
      {
        where: {
          id: newId,
        },
      }
      );
      console.log(updatedMember1);
    const updatedMember2 = await People.update(
      { siblings: [...existingSibling, { id: newId }] },
      {
        where: {
          id: id,
        },
      }
      );
      console.log(updatedMember2);

      const updatedSiblings = await People.findOne({where:{id:id}})
      if(updatedSiblings.siblings !== undefined){ addedSibling = updatedSiblings.siblings.slice()}

      for(let i=0; i< addedSibling.length;i++){
        let siblings = addedSibling.filter (obj =>obj.id !== addedSibling[i].id)
        const updatedMember3 = await People.update(
          { siblings: [...siblings  , {id:id}] },
          {
            where: {
              id: addedSibling[i].id,
            },
          }
          );
          console.log(updatedMember3);
      }

      let parent = []
      const result3 = await People.findOne({where:{id:id}})
      if(result3.parents !== undefined){parent = result3.parents.slice()}
      console.log(parent)
      for(let i=0; i< parent.length;i++){
        const result4 = await People.findOne({where:{id:parent[i].id}})
        if(result4.children !== undefined) { currentChild = result4.children.slice()}
        const updatedMember4 = await People.update(
          { children: [...currentChild  , {id:newId}] },
          {
            where: {
              id: parent[i].id,
            },
          }
          );
          console.log(updatedMember4);
      }
      for(let i=0; i< addedSibling.length;i++){
        const updatedMember5 = await People.update(
          { parents: [...parent] },
          {
            where: {
              id: addedSibling[i].id,
            },
          }
          );
          console.log(updatedMember5);
      }

      } catch (error) {
        console.error(error)
      }
};
const spouse = async (id, newId) => {
  try {
    // fungsi untuk melakukan update relasi dengan children baru
    let existingSpouse = []
    let addedSpouse = [];
    const result1 = await People.findOne({ where: { id: id } });
    console.log("result1.spouses: "+ result1.spouses);
    if (result1.spouses !== undefined) {existingSpouse = result1.spouses.slice();}
    console.log("spouses.length: ", existingSpouse.length);
    
    console.log("helloo");
    const updatedMember1 = await People.update(
      { spouses: [...existingSpouse, { id: newId }] },
      {
        where: {
          id: id,
        },
      }
      );
      console.log(updatedMember1);
      
      const updatedMember2 = await People.update(
        { spouses: [...addedSpouse  , {id:id}] },
        {
          where: {
            id: newId,
          },
        }
        );
        console.log(updatedMember2);

        let existingChild = [];
        const result2 = await People.findOne({ where: {id: id}})
        if(result2.children !== undefined){
          existingChild = result2.children.slice()
          console.log(result2.children)
          console.log(existingChild)
          console.log(result2.spouses.length)
          if(result2.spouses.length === 1){
            const updatedMember3 = await People.update(
              { children: [...existingChild]},
              {
                where:{
                  id:newId
                },
              }
            )
            console.log("test")
            console.log(updatedMember3)
            for(let i = 0; i < existingChild.length; i++){
              const updatedMember4 = await People.update(
                { parents: [{id:id}, {id:newId}]},
                {
                  where:{
                    id: existingChild[i].id
                  }
                }
              )
            }
          }

        }
      } catch (error) {
        console.error(error)
      }


};

exports.addPeople = async (req, res) => {
  const {
    nama,
    alias,
    nama_kecil,
    jabatan,
    awal_jabatan,
    akhir_jabatan,
    gender,
    tanggal_lahir,
    tanggal_wafat,
    alamat_makam,
    alamat,
    parents,
    children,
    spouses,
    siblings,
  } = req.body;
  try {
    if (!nama) {
      res.status(400).send({ message: "Masukkan data nama anggota !" });
      return;
    }
    const people = await People.create({
      nama: nama,
      alias: alias,
      nama_kecil: nama_kecil,
      jabatan: jabatan,
      awal_jabatan: awal_jabatan,
      akhir_jabatan: akhir_jabatan,
      gender: gender,
      tanggal_lahir: tanggal_lahir,
      tanggal_wafat: tanggal_wafat,
      alamat_makam: alamat_makam,
      alamat: alamat,
      parents: parents,
      children: children,
      spouses: spouses,
      siblings: siblings,
      // child_id: [child_id],
      // spouse_id: [spouse_id]
    });
    let data = {
      nama: people.nama,
      alias: people.alias,
      nama_kecil: people.nama_kecil,
      jabatan: people.jabatan,
      awal_jabatan: people.awal_jabatan,
      akhir_jabatan: people.akhir_jabatan,
      gender: people.gender,
      tanggal_lahir: people.tanggal_lahir,
      tanggal_wafat: people.tanggal_wafat,
      alamat_makam: people.alamat_makam,
      alamat: people.alamat,
      parents: people.parents,
      children: people.children,
      spouses: people.spouses,
      siblings: people.siblings,
      // child_id: people.child_id,
      // spouse_id:people.spouse_id
    };
    res.status(200).send({
      success: true,
      message: "Data Added",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occured while adding people data.",
    });
  }
};
exports.addPeopleWithRelation = async (req, res) => {
  const {
    existing_id,
    nama,
    alias,
    nama_kecil,
    jabatan,
    awal_jabatan,
    akhir_jabatan,
    gender,
    tanggal_lahir,
    tanggal_wafat,
    alamat_makam,
    alamat,
    // parents,
    // children,
    // spouses,
    // siblings,
    relation,
  } = req.body;
  console.log(req.body)
  try {
    let people = await People.findOne({ where: { id: existing_id } });
    if (!people) {
      res.status(500).send({
        message:  "Gagal dalam mencari data anggota",
      });
    }
    if (!nama) {
      res.status(400).send({ message: "Masukkan data nama anggota !" });
      console.log("test")
      return;
    }
    const new_people = await People.create({
      nama: nama,
      alias: alias,
      nama_kecil: nama_kecil,
      jabatan: jabatan,
      awal_jabatan: awal_jabatan,
      akhir_jabatan: akhir_jabatan,
      gender: gender,
      tanggal_lahir: tanggal_lahir,
      tanggal_wafat: tanggal_wafat,
      alamat_makam: alamat_makam,
      alamat: alamat,
      // parents: parents,
      // children: children,
      // spouses: spouses,
      // siblings: siblings,
      // child_id: [child_id],
      // spouse_id: [spouse_id]
    });


    if (relation === "parent") {
      parent(existing_id, new_people.id);
    } else if (relation === "children") {
      children(existing_id, new_people.id);
    } else if (relation === "sibling") {
      sibling(existing_id,new_people.id);
    } else {
      spouse(existing_id,new_people.id);
    }
    let data = {
      existing_id: people.id,
      nama: people.nama,
      alias: people.alias,
      nama_kecil: people.nama_kecil,
      jabatan: people.jabatan,
      awal_jabatan: people.awal_jabatan,
      akhir_jabatan: people.akhir_jabatan,
      gender: people.gender,
      tanggal_lahir: people.tanggal_lahir,
      tanggal_wafat: people.tanggal_wafat,
      alamat_makam: people.alamat_makam,
      alamat: people.alamat,
      parents: people.parents,
      children: people.children,
      spouses: people.spouses,
      siblings: people.siblings,
      // child_id: people.child_id,
      // spouse_id:people.spouse_id
    };
    res.status(200).send({
      success: true,
      message: "Data Added Successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occured while adding people data.",
    });
  }
};

// exports.addPeopleWithRelationzxz = async (req, res) => {
//   try {
//     const { existing_id, name, gender, birth, death, grave, address } =
//       req.body;
//     let people = await People.findOne({ where: { id: existing_id } });
//     if (!people) {
//       res.status(500).send({
//         message: "Gagal dalam mencari data anggota",
//       });
//     } else {
//       try {
//         const new_people = new People.create({
//           name: name,
//           gender: gender,
//           birth: birth,
//           death: death,
//           grave: grave,
//           address: address,
//         });
//         let data = {
//           name: new_people.name,
//           gender: new_people.gender,
//           birth: new_people.birth,
//           death: new_people.death,
//           grave: new_people.grave,
//           address: new_people.address,
//           // parents: new_people.parents,
//           // children: new_people.children,
//           // spouses: new_people.spouses,
//           // siblings: new_people.siblings,
//           // child_id: people.child_id,
//           // spouse_id:people.spouse_id
//         };
//         res.status(200).send({
//           success: true,
//           message: "New Member Data Added",
//           data,
//         });
//       } catch (err) {
//         res.status(500).send({
//           message:
//             err.message ||
//             "Some error occured while adding New People with relation",
//         });
//       }
//     }

//     // const new_people = new People.create({
//     //   name: name,
//     //   gender: gender,
//     //   birth: birth,
//     //   death: death,
//     //   grave: grave,
//     //   address: address,
//     // })
//     // let data = {
//     //   name: new_people.name,
//     //   gender: new_people.gender,
//     //   birth: new_people.birth,
//     //   death: new_people.death,
//     //   grave: new_people.grave,
//     //   address: new_people.address,
//     //   parents: new_people.parents,
//     //   children: new_people.children,
//     //   spouses: new_people.spouses,
//     //   siblings: new_people.siblings,
//     //   // child_id: people.child_id,
//     //   // spouse_id:people.spouse_id
//     // };
//     // res.status(200).send({
//     //   success: true,
//     //   message: "Data Added",
//     //   data,
//     // });
//   } catch (err) {
//     res.status(500).send({
//       message:
//         err.message ||
//         "Some error occured while adding New People with relation",
//     });
//   }
// };

exports.getPeople = async (req, res) => {
  await People.findAll({ order:[["id","ASC"]]})
    .then((data) => {
      let output = [];
      let data_output = [];
      // let people_id = []
      // let data_relation_output = []
      let parents = [];

      for (let index = 0; index < data.length; index++) {
        // people_id[index]=data[index].id

        data_output[index] = {
          id: data[index].id,
          nama: data[index].nama,
          alias: data[index].alias,
          nama_kecil: data[index].nama_kecil,
          jabatan: data[index].jabatan,
          awal_jabatan: data[index].awal_jabatan,
          akhir_jabatan: data[index].akhir_jabatan,
          gender: data[index].gender,
          tanggal_lahir: data[index].tanggal_lahir,
          tanggal_wafat: data[index].tanggal_wafat,
          alamat_makam: data[index].alamat_makam,
          alamat: data[index].alamat,
          parents: data[index].parents,
          children: data[index].children,
          spouses: data[index].spouses,
          siblings: data[index].siblings,
        };
        // data_relation_output[index]=
        // {
        //   father_id : data[index].father_id,
        //   mother_id : data[index].mother_id,
        //   spouse : data[index].spouse_id[0],
        //   child  : data[index].child_id[0]
        // }
        output[index] = data_output[index];
        // {
        //   // id:people_id[index],
        //   people_data : data_output[index],
        //   // people_relation : data_relation_output[index]
        // }
      }

      console.log(data);
      response.successResponse(res, output);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving people with people_id=" + err,
      });
    });
};

exports.getOnePeople = async (req, res) => {
  try {
    let id = req.params.id;
    let people = await People.findOne({ where: { id: id } });
    res.status(200).send({
      success: true,
      people,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting People",
    });
  }
};

exports.getOnePeopleRelations = async (req,res) => {
  try{
    let id = req.body;
    let people = await People.findOne({ where: { id: id } });
    let data = {
      parents: people.parents,
      siblings:people.siblings,
      children:people.children,
      spouses:people.spouses,
    }
    res.status(200).send({
      success: true,
      data,
    });
  } catch {}
}

exports.updatePeopleDeathStatus = async (req,res)=> {
  try{
    let { id, tanggal_wafat, alamat_makam } = req.body
    let people = await People.findOne({ where: { id: id } });
    if (!people) {
      res.status(500).send({
        message:  "Gagal dalam mencari data anggota",
      });
    }
    if(!tanggal_wafat) {
      res.status(400).send({
        message:"Status harus diisi!"
      });
    }
    const updatedMember = await People.update(
      {tanggal_wafat:tanggal_wafat, alamat_makam:alamat_makam},
      { where:
        {
        id:id
        }
      }
    )
    res.status(200).send({
      success: true,
      updatedMember,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting People",
    });
  }
}
exports.updatePeopleBiodata = async (req,res)=> {
  try{
    let {
      id,
      nama,
      alias,
      nama_kecil,
      jabatan,
      awal_jabatan,
      akhir_jabatan,
      gender,
      tanggal_lahir,
      tanggal_wafat,
      alamat_makam,
      alamat,
     } = req.body
    let people = await People.findOne({ where: { id: id } });
    if (!people) {
      res.status(500).send({
        message:  "Gagal dalam mencari data anggota",
      });
    }

    const updatedMember = await People.update(
      { 
        nama:nama,
        alias:alias,
        nama_kecil:nama_kecil,
        jabatan:jabatan,
        awal_jabatan:awal_jabatan,
        akhir_jabatan:akhir_jabatan,
        gender:gender,
        tanggal_lahir:tanggal_lahir,
        tanggal_wafat:tanggal_wafat,
        alamat_makam:alamat_makam,
        alamat:alamat
      },
      { where:
        {
        id:id
        }
      }
    )
    res.status(200).send({
      success: true,
      updatedMember,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while getting People",
    });
  }
}

exports.deletePeople = async (req, res) => {
  let {
    id
   } = req.body
  try {
    let people = await People.findOne({ where: { id: id } });
    if (!people) {
      res.status(500).send({
        message:  "Gagal dalam mencari data anggota",
      });
    }
    let membersParent = [];
    let membersChildren = [];
    let membersSpouses =[];
    let membersSiblings=[];

    let existingParent = [];
    let existingChildren = [];
    let existingSpouses =[];
    let existingSiblings=[];
    if (people !== undefined)
    {
      membersParent = people.parents.slice();
      membersChildren = people.children.slice();
      membersSpouses = people.spouses.slice();
      membersSiblings = people.siblings.slice();
    }
    console.log(membersParent)
    console.log("parent.length: ", membersParent.length);

    if(membersParent.length !== 0){      
      for(let i=0; i<membersParent.length; i++){
        let result2 = await People.findOne({ where: { id: membersParent[i].id } });
        console.log("Hello")
        console.log(result2)
        if(result2.children !== undefined){ existingChildren = result2.children.slice()}
        let updatedChildren = existingChildren.filter(obj => obj.id !== id)
        const updatedMember1 = await People.update(
          { children: [...updatedChildren] },
          { where:{
              id:membersParent[i].id
            }
          }
        )
      }
    }

    console.log(membersSpouses)
    console.log("spouses.length: ", membersSpouses.length);
    if(membersSpouses.length !==0){
      for(let i = 0; i<membersSpouses.length;i++){
        console.log("Hey1")
        console.log(membersSpouses[i].id)
        let result3 = await People.findOne ({ where:{id: membersSpouses[i].id}})
        console.log(result3)
        if(result3.spouses !== undefined){ existingSpouses = result3.spouses.slice()}
        let updatedSpouses = existingSpouses.filter(obj => obj.id !== id)
        const updatedMember2 = await People.update(
          { spouses: [...updatedSpouses]},
          {where:{
            id:membersSpouses[i].id
          }}
        )
      }
    }
    console.log(membersChildren)
    console.log(membersChildren.length)
    console.log("children.length: ", membersChildren.length);
    if(membersChildren.length !==0){
      for(let i = 0; i<membersChildren.length;i++){
        console.log("Hey2")
        console.log(membersChildren[i].id)
        let result4 = await People.findOne ({ where:{id: membersChildren[i].id}})
        console.log(result4)
        if(result4.parents !== undefined){ existingParent = result4.parents.slice()}
        let updatedParents = existingParent.filter(obj => obj.id !== id)
        const updatedMember3 = await People.update(
          { parents: [...updatedParents]},
          {where:{
            id:membersChildren[i].id
          }}
        )
      }
    }
    if(membersSiblings.length !==0){
      for(let i = 0; i<membersSiblings.length;i++){
        console.log("Hey3")
        console.log(membersSiblings[i].id)
        let result5 = await People.findOne ({ where:{id: membersSiblings[i].id}})
        console.log(result5)
        if(result5.parents !== undefined){ existingSiblings = result5.siblings.slice()}
        let updatedSiblings = existingSiblings.filter(obj => obj.id !== id)
        const updatedMember4 = await People.update(
          { siblings: [...updatedSiblings]},
          {where:{
            id:membersSiblings[i].id
          }}
        )
      }
    }

    const deletedMember = await People.update(
      {parents :[], siblings:[], children:[],spouses:[]},
      {where :{id:id}}
    )
    console.log(deletedMember)


    res.status(200).send({
      success: true,
      message:"Member Deleted Successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occured while deleting people data.",
    });
  }
};
