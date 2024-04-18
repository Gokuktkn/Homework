import axios from 'axios';
import express from 'express'

const app = express();
app.use(express.json());

const PORT = 1007;

const getInfo = async (condition, value, data) => {
    try {
        const res = await axios.get(data);
        const infoData = res.data;
        const info = infoData.find((item) => item[condition] === value);
        return info;
    } catch (error) {
        console.error("Error fetching info:", error);
        throw error;
    }
};

//Check data
app.get("", async (req, res) => {
    try {
        const userRes = await axios.get("http://localhost:5000/users");
        const users = userRes.data;
        const postRes = await axios.get("http://localhost:5000/posts");
        const posts = postRes.data;
        const commentRes = await axios.get("http://localhost:5000/comments");
        const comments = commentRes.data;

        const data = {
            users,
            posts,
            comments
        }
        return res.json({
            message: "Register successfully",
            results: data,
        });
    } catch (error) {
        return res.json({
            message: "Error: " + error.message,
        });
    }

});

//Bai 1
app.post("/register", async (req, res) => {
    try {
        const { userName } = req.body;
        //Kiểm tra user có tồn tại không
        const isUserExist = await getInfo(userName, userName, "http://localhost:5000/users");
        if (isUserExist) {
            throw new Error("User already exist");
        }
        const user = {
            id: `US${Math.floor(1000 + Math.random() * 9000)}`,
            userName
        };
        await axios.post("http://localhost:5000/users", user);
        return res.json({
            message: "Register successfully",
            results: user,
        });
    } catch (error) {
        return res.json({
            message: "Error: " + error.message,
        });
    };
});

//Bai 2
app.post("/post", async (req, res) => {
    try {
        const { userId, postContent } = req.body;

        const confirmId = await getInfo("id", userId, "http://localhost:5000/users");
        if (!confirmId) {
            throw new Error("User is not exists");
        }
        const post = {
            id: `PS${Math.floor(1000 + Math.random() * 9000)}`,
            authorId: userId,
            postContent
        };
        await axios.post("http://localhost:5000/posts", post);
        return res.json({
            message: "Post Successfully",
            result: post,
        });
    } catch (error) {
        return res.json({
            message: "Error: " + error.message,
        });
    }
});

//Bai 3
app.put("/post", async (req, res) => {
    try {
        const { postId, authorId, updateContent } = req.body;
        const isPostExist = await getInfo("id", postId, "http://localhost:5000/posts")
        if (isPostExist) {
            const authorRes = await axios.get(`http://localhost:5000/posts/${postId}`);
            const authorData = authorRes.data;
            const isAuthorValid = (toString(authorData.authorId) === toString(authorId));
            if (isAuthorValid) {
                const updateData = {
                    postContent: updateContent,
                    authorId
                }
                const postRes = await axios.put(`http://localhost:5000/posts/${postId}`, updateData);
                return res.json({
                    message: "Posts Updated Successfully",
                    result: postRes.data
                });
            } else {
                return res.json({
                    message: "You are not author"
                });
            }
        } else {
            return res.json({
                message: "Post does not exist"
            });
        }
    } catch (error) {
        return res.json({
            message: "Error: " + error.message,
        });
    }
});

//Bai 4
app.post("/comment", async (req, res) =>{
    try {
        const {postId, content, authorId} = req.body;
        const confirmUserId = await getInfo("id", authorId, "http://localhost:5000/users");
        const confirmPostId = await getInfo("id", postId, "http://localhost:5000/posts");
        if (!confirmPostId) {
            throw new Error("Post is not exists");
        } else if (!confirmUserId) {
            throw new Error("User is not exists");
        }
        const comment = {
            id: `CMT${Math.floor(1000 + Math.random() * 9000)}`,
            postId,
            content,
            authorId
        };
        await axios.post("http://localhost:5000/comments", comment);
        return res.json({
            message: "Comment Successfully",
            result: comment,
        });
    } catch (error) {
        return res.json({
            message: "Error: " + error.message,
        });
    }
});

//Bai 5
app.put("/comment", async (req, res) => {
    try {
        const { commentId, authorId, updateContent } = req.body;
        const isCommentExist = await getInfo("id", commentId, "http://localhost:5000/comments")
        if (isCommentExist) {
            const authorRes = await axios.get(`http://localhost:5000/comments/${commentId}`);
            const authorData = authorRes.data;
            const isAuthorValid = (toString(authorData.authorId) === toString(authorId));
            if (isAuthorValid) {
                const updateData = {
                    content: updateContent,
                    postId : authorData.postId,
                    authorId
                }
                const postRes = await axios.put(`http://localhost:5000/comments/${commentId}`, updateData);
                return res.json({
                    message: "Comment Updated Successfully",
                    result: postRes.data
                });
            } else {
                return res.json({
                    message: "You are not author"
                });
            }
        } else {
            return res.json({
                message: "Comment does not exist"
            });
        }
    } catch (error) {
        return res.json({
            message: "Error: " + error.message,
        });
    }
});
app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error ${err.message}`);
    } else {
        console.log(`You are listening on ${PORT}`);
    }
});