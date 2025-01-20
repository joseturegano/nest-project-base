import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Item extends Document {
  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
    index: true,
  })
  @Transform(({ value }) => value?.trim())
  name: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500,
  })
  @Transform(({ value }) => value?.trim())
  description: string;

  @Prop({ default: true, index: true })
  active: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.index({ name: 1, active: 1 }, { unique: true });

ItemSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.name = this.name.trim();
  }
  if (this.isModified('description')) {
    this.description = this.description.trim();
  }
  next();
});
