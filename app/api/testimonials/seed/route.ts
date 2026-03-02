import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';

// Default testimonials to seed the database
const defaultTestimonials = [
    {
        name: "Arijit Sen",
        country: "Senior",
        type: "Senior",
        avatar: "https://i.pravatar.cc/150?u=arijit",
        feedback:
            "Bikram has a strong problem-solving mindset and a genuine curiosity for learning. During our collaboration, he consistently took ownership of challenging tasks and delivered clean, well-structured solutions. His dedication and growth mindset really stand out.",
        rating: 5,
    },
    {
        name: "Rohit Sharma",
        country: "Hackathon Teammate",
        type: "Teammate",
        avatar: "https://i.pravatar.cc/150?u=rohit",
        feedback:
            "Working with Bikram during the hackathon was a great experience. He handled both frontend and backend responsibilities smoothly and always focused on performance and user experience. His ability to stay calm under pressure helped our team a lot.",
        rating: 5,
    },
    {
        name: "Ananya Das",
        country: "Hackathon Teammate",
        type: "Teammate",
        avatar: "https://i.pravatar.cc/150?u=ananya",
        feedback:
            "Bikram has a deep interest in AI and system design. I was impressed by how he integrates machine learning concepts into real-world applications instead of just building basic projects. He always aims to build something meaningful.",
        rating: 5,
    },
    {
        name: "Sayan Roy",
        country: "Project Partner",
        type: "Partner",
        avatar: "https://i.pravatar.cc/150?s=sayan",
        feedback:
            "One thing I admire about Bikram is his collaborative nature. He communicates clearly, listens to feedback, and actively contributes ideas. He doesn't just write code — he thinks about architecture and scalability.",
        rating: 5,
    },
    {
        name: "Priyanka Mukherjee",
        country: "Senior",
        type: "Senior",
        avatar: "https://i.pravatar.cc/150?u=priyanka",
        feedback:
            "Bikram is extremely consistent and disciplined in his work. Whenever we worked together, he delivered on time and ensured everything was properly tested. His attention to detail makes his projects feel polished and professional.",
        rating: 5,
    },
    {
        name: "Amit Verma",
        country: "Project Partner",
        type: "Partner",
        avatar: "https://i.pravatar.cc/150?u=amit",
        feedback:
            "Bikram has a great sense of UI and interaction design. His projects aren't just functional — they feel modern and well-crafted. His experiments with animations and interactive components show strong creativity and technical depth.",
        rating: 5,
    },
];

// POST: Seed the database with default testimonials
export async function POST() {
    try {
        await dbConnect();

        // Check if testimonials already exist
        const existingCount = await Testimonial.countDocuments();

        if (existingCount > 0) {
            return NextResponse.json({
                success: true,
                message: 'Database already contains testimonials',
                count: existingCount,
            });
        }

        // Insert default testimonials
        const result = await Testimonial.insertMany(defaultTestimonials);

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            count: result.length,
        });
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to seed database',
            },
            { status: 500 }
        );
    }
}
