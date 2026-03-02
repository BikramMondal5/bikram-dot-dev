import mongoose, { Schema, Model, models } from 'mongoose';

export interface ITestimonial {
    name: string;
    country: string;
    type: string;
    avatar?: string;
    feedback: string;
    rating: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        country: {
            type: String,
            required: [true, 'Country/Role is required'],
            trim: true,
            maxlength: [100, 'Country/Role cannot be more than 100 characters'],
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            enum: ['Senior', 'Teammate', 'Partner', 'Client', 'Other'],
            default: 'Other',
        },
        avatar: {
            type: String,
            default: 'https://i.pravatar.cc/150',
        },
        feedback: {
            type: String,
            required: [true, 'Feedback is required'],
            trim: true,
            maxlength: [1000, 'Feedback cannot be more than 1000 characters'],
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot be more than 5'],
            default: 5,
        },
    },
    {
        timestamps: true,
    }
);

const Testimonial: Model<ITestimonial> =
    models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
