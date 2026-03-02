import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';

// GET: Fetch all testimonials
export async function GET() {
    try {
        await dbConnect();
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: testimonials,
        });
    } catch (error: any) {
        console.error('GET /api/testimonials error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to fetch testimonials',
            },
            { status: 500 }
        );
    }
}

// POST: Create a new testimonial
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.feedback) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Name and feedback are required',
                },
                { status: 400 }
            );
        }

        // Create testimonial
        const testimonial = await Testimonial.create({
            name: body.name,
            country: body.role || body.country || 'Unknown',
            type: body.type || 'Other',
            avatar: body.avatar || `https://i.pravatar.cc/150?u=${body.name}`,
            feedback: body.feedback,
            rating: body.rating || 5,
        });

        return NextResponse.json(
            {
                success: true,
                data: testimonial,
                message: 'Testimonial created successfully',
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('POST /api/testimonials error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to create testimonial',
            },
            { status: 500 }
        );
    }
}
