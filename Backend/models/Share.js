const mongoose = require("mongoose");
const { Schema } = mongoose;

// const personSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     person: [
//         {
//             id: Number,
//             name: String,
//             // Allow any other properties
//         }
//     ]
// });

// const personData = {
//     name: 'John Doe',
//     age: 30,
//     person: [
//         { id: 1, name: 'Alice', address: { street: 'Main St', city: 'New York' } },
//         { id: 2, name: 'Bob', email: 'bob@example.com' }
//     ]
// };
const ShareSchema = Schema({
  author: {
    Username: String,
  },
  title: {
    type: String,
    require: true,
  },
  tag: {
    type: [String],
  },
  photo: {
    type: String,
  },
  person: [
    {
      Username: String,
      Rs: Number,
      Desc: String,
      // Allow any otefher properties
    },
  ],
});
ShareSchema.add({ author: String });
const Share = mongoose.model("share", ShareSchema);
Share.createIndexes();
module.exports = Share;
