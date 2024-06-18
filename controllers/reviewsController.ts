import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getReviewByHotelId = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const reviews = await prisma.review.findMany({
      where: {
        hotelId: parseInt(hotelId),
      },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Add a new review
export const addReview = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const { rating, content } = req.body;
    const newReview = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        content: content,
        hotelId: parseInt(hotelId),
      },
    });
    res.json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { rating, content } = req.body;
    const updatedReview = await prisma.review.update({
      where: {
        id: parseInt(reviewId),
      },
      data: {
        rating: parseInt(rating),
        content: content,
        updatedAt: new Date(),
      },
    });
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    await prisma.review.delete({
      where: {
        id: parseInt(reviewId),
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
