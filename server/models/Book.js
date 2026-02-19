
import mongoose from 'mongoose';
console.log('Model Mongoose Version:', mongoose.version);

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    genre: {
        type: String, // e.g., Fiction, Non-Fiction, Sci-Fi
        required: true
    },
    availability: {
        type: String,
        enum: ['Available', 'Checked Out'],
        default: 'Available'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        }
    }
});

export default mongoose.model('Book', bookSchema);
