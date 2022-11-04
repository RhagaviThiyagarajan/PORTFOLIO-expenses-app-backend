//get categories

const model = require("../modules/model");

//POST
//POST-http://localhost:8000/api/categories
async function create_Categories(req, res){
    const Create = new model.Categories({
        type: req.body.type,
        color: "#FCBE44"
    })
 
    await Create.save(function(err){
        if (!err) return res.json(Create);
        return res.status(400).json({ message : `Error while creating categories ${err}`});
    });
 }

//get
//-http://localhost:8000/api/categories

async function get_Categories(req, res) {
  let data = await model.Categories.find({});
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
}

//post
//-http://localhost:8000/api/transaction
async function create_Transaction(req, res) {
  if (!req.body)
    return res
      .status(400)
      .json("POST data in the body to display in the console");
  let { name, type, amount } = req.body;
  const Create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });
  Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` });
  });
}

//get-//-http://localhost:8000/api/transaction

async function get_Transaction(req, res) {
  let data = await model.Transaction.find({});
  return res.json(data);
}

//delete-http://localhost:8000/api/transaction

async function delete_Transaction(req, res) {
  if (!req.body)
    res.status(400).json({
      message: "Request body not found",
    });
  await model.Transaction.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleted transactions");
    });
}

//get-http://localhost:8000/api/transaction

async function get_Labels(req, res) {
  model.Transaction.aggregate([
    {
      //lookup -helps to look up specific key in a  lookup collection
      $lookup: {
        from: "categories", //collection we want to join
        localField: "type", //specify the field we want to join as local collection
        foreignField: "type", //field wanted to join as foreign property
        as: "categories_info", //result
      },
    },
    {
      $unwind: "$categories_info", //reconstruct an array field from input docx and ouput the docx from each field
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Lookup colection error");
    });
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
