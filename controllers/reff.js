exports.getCarts = async (req, res) => {
  user_id = req.user_id_loggedin;
  user_id = user_id.toString();
  // const merchId = req.body.merchandise_id;
  // if (!req.query.filter) {
  //   return req.query.filter;
  // }
  await Cart.findAll(
    {
      where: {user_id: user_id},
      include: [
      {
        model: Merchandise,
        attributes: ['nama_merchandise', 'price','variant'],
        include: [{
          model: Image,
          attributes: ['images_link'],
          require: false
          }]
      }]
      //   {
      //     model: Culture,
      //     attributes: ['culture_id', 'nama_budaya'],
      //     require: false
      //   },
      //   {
      //     model: Destination,
      //     attributes: ['destination_id', 'nama_destinasi', 'tipe_destinasi'],
      //     require: false
      //   },
      //   {
      //     model: Merchandise,
      //     attributes: ['merchandise_id', 'nama_merchandise','merchandise_type'],
      //     require: false
      //   },
      //   {
      //     model: Image,
      //     attributes: ['images_link'],
      //     require: false
      //   },
      //   {
      //     model: Videovr,
      //     require: false
      //   }
      // ],
      }
  )
    .then(data => {
      let data_output = []
      // for (const key in data) {
      //   let cart_item = {
      //     cart_id : data[key].cart_id,
      //     merchandise_id : data[key].merchandise_id,
      //     nama_merchandise : data[key].merchandise.nama_merchandise,
      //     price : data[key].price,
      //     variant : data[key].merchandise.variant,
      //     quantity : data[key].quantity,
      //     image_link : data[key].merchandise.image_link
      //   };
      // }
      let sub_total_items = 0
      for (let index = 0; index < data.length; index++) {
        data_output[index] = {
          cart_id : data[index].cart_id,
          merchandise_id : data[index].merchandise_id,
          nama_merchandise : data[index].merchandise.nama_merchandise,
          price : data[index].price,
          variant : data[index].merchandise.variant,
          quantity : data[index].quantity,
          image_link : data[index].merchandise.images[0].images_link,
          subtotal_price_item : data[index].price * data[index].quantity
        }
        sub_total_items += data_output[index].subtotal_price_item;
      }

      let output = {
        sub_total_price : sub_total_items,
        cart_item : data_output
      }
      // const output = {
      //   cart_id : data.cart_id,
      //   merchandise_id : data.merchandise_id,
      //   nama_merchandise : data.merchandise.nama_merchandise,
      //   price : data.price,
      //   variant : data.merchandise.variant,
      //   quantity : data.quantity,
      //   image_link : data.merchandise.image_link
      // };
      response.successResponse(res, output);
      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cart with user_id=" + err
      });
    });
};