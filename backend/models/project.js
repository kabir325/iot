const mongoose = require('mongoose');
const { Schema } = mongoose;

const componentInstanceSchema = new Schema({
  component: { type: Schema.Types.ObjectId, ref: 'Component', required: true },
  quantity: { type: Number, default: 1 },
  config: { type: Schema.Types.Mixed } // optional for any instance-specific data like pin mappings
}, { _id: false });

const versionEntrySchema = new Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true }
}, { _id: false });

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },

  image: { type: String }, // URL or filename of the preview image
  componentsUsed: [componentInstanceSchema], // list of component instances used
  connections: { type: Schema.Types.Mixed, default: {} }, // store connections later (placeholder)

  notes: { type: String, default: '' }, // optional notes user can add
  versionHistory: [versionEntrySchema], // list of edits/changes with dates
  isPublic: { type: Boolean, default: false }, // whether project is public or private
  views: { type: Number, default: 0 }, // view count for public projects
  likes: { type: Number, default: 0 }, // like count for public projects
  tags: [{ type: String }] // tags for categorizing projects
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
