import { Schema, model } from 'mongoose';
import slugify from 'slugify';
import validator from 'validator';

// fat model slim controller mindset
const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxLength: [40, 'A tour name must have less or equal than 40 characters'],
    minLength: [10, 'A tour name must have more or equal than 10 characters'],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'hard ;)'],
      message: 'Difficulty is either: easy, medium, or hard ;)'
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10 // 4.6667 -> 46.67 -> 4.7
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      // This only works on CREATE and SAVE!!! not on findOneAndUpdate
      validator: function(val) {
        return val < this.price; // this only points to current doc on NEW document creation
      },
      message: 'Discount price ({VALUE}) should be below regular price'
    }
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date],
  isSecret: {
    type: Boolean,
    default: false
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs pre- / post- .save() and .create() (but not .insertMany())
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log('Document saved:', doc);
//   next();
// });

// QUERY MIDDLEWARE: runs pre- / post- .find() and .findOne()
tourSchema.pre(/^find/, function(next) {
  this.find({ isSecret: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  // console.log('Query executed:', docs);
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE: runs pre- / post- .aggregate()
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { isSecret: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Tour = model('Tour', tourSchema);

export default Tour;