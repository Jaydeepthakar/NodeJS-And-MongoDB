const Product = require("../../models/product")


const getAll = (req, res) => {
    return res.json({
        msg: "get all products",
        data: Product
    })
}

const getOne = (req, res) => {

    const productId = req.params["productId"]

    return res.json({
        msg: `get one product ${productId}`
    })
}

const createOne = (req, res) => {

    const bodyData = req.body

    return res.json({
        msg: "create one product",
        data: bodyData
    })
}

const updateOne = (req, res) => {
    let productId = Number(req.params["productId"])

    const bodyData = req.body

    if (!productId) return res.status(400).json({ msg: "productId is wrong" })

    if (productId >= Product.length) return res.json({ msg: "product not found" })

    if (!bodyData) return res.json({ msg: "data in body not found" })

    productId--;

    if (bodyData["title"]) {
        Product[productId]["title"] = bodyData["title"]
    }

    if (bodyData["price"]) {
        Product[productId]["price"] = bodyData["price"]
    }

    if (bodyData["description"]) {
        Product[productId]["description"] = bodyData["description"]
    }

    return res.json({
        msg: `update one product ${productId}`,
        data: bodyData
    })
}

const deleteOne = (req, res) => {
    const productId = req.params["productId"]
    return res.json({
        msg: `delete one product ${productId}`
    })
}


module.exports = { getAll, getOne, createOne, updateOne, deleteOne }