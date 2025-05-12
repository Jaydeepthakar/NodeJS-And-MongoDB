const express = require("express")
const user = require("./controller")
const { requireAuth } = require('../middlewara/auth')




const routes = express.Router();

        routes.post( "/create",user.createOne)
        routes.route("/")
                .get(requireAuth , user.getAll)
                // .post(user.createOne)
        routes.route("/:userID")
                .get(user.getOne)
                .put(user.updateOne)
                .delete(user.deleteOne)
        routes.post("/login", user.login)
        routes.post("/logout", user.logout)
        routes.post("/resetPassword",requireAuth, user.resetPassword)
        routes.post("/sendOtp", user.sendOtp)
        routes.post("/forgotPassword", user.forgotPassword)

// routes.post('/:id/blogs', user.createBlog);
// routes.get('/:id/blogs', user.getAllBlogs);
// routes.get('/:id/blogs/:blogId', user.getSingleBlog);
// routes.put('/:id/blogs/:blogId', user.updateBlog);
// routes.delete('/:id/blogs/:blogId', user.deleteBlog);
// routes.post('/login' , user.login);

module.exports = routes ;            