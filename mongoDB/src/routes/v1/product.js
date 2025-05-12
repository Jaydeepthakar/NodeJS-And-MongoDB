const express = require("express")
const product = require("../../controllers/v1/product")
const { middleware } = require("../../middlewares/testing")

const route = express.Router()


route.use(middleware)

// route.get("/", product.getAll)
// route.get("/:productId", product.getOne)
// route.post("/", product.createOne)
// route.put("/:productId", product.updateOne)
// route.delete("/:productId", product.deleteOne)

route.route("/")
    .get(product.getAll)
    .post(product.createOne)

route.all("/all", (req, res) => {
    res.json({ msg: "for all types of req" })
})

// always put dynamic route at last
route.route("/:productId")
    .get(product.getOne)
    .put(product.updateOne)
    .delete(product.deleteOne)




module.exports = route