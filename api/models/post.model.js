import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
            unique: true,
        },
        image:{
            type: String,
            default: 'https://www.webtechnomind.com/wp-content/uploads/2024/02/1698221248_inner-blog-img.svg'
        },
        category:{
            type: String,
            default: 'uncategorized',
        },
        slug:{
            type: String,
            required: true,
            unique: true,
        },

    }, { timestamps:true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
