import mongoose, { Schema, Document, Model } from 'mongoose';
import { Product as IProductType } from '@/types/store';

export interface IProductDocument extends Omit<IProductType, 'id'>, Document {}

const ProductColorSchema = new Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  inStock: { type: Boolean, default: true },
});

const ProductReviewSchema = new Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: true },
});

const ProductSchema = new Schema<IProductDocument>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    category: {
      type: String,
      enum: ['workspace', 'audio', 'living', 'apparel', 'carry'],
      required: true,
    },
    rating: { type: Number, default: 5 },
    reviewCount: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 10 },
    images: [{ type: String }],
    description: { type: String, required: true },
    highlights: [{ type: String }],
    specs: { type: Map, of: String },
    colors: [ProductColorSchema],
    sizes: [{ type: String }],
    badge: {
      type: String,
      enum: ['BESTSELLER', 'NEW ARRIVAL', 'LIMITED RUN', 'STAFF PICK', 'LOW STOCK'],
    },
    featured: { type: Boolean, default: false },
    reviews: [ProductReviewSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const ProductModel: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);

export default ProductModel;
