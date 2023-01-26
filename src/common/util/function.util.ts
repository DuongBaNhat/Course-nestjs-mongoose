import { Document, Types, Model, FilterQuery } from "mongoose";
import { Category, CategoryDocument } from "src/database/entities/category.schema";
import { Level, LevelDocument } from "src/database/entities/level.schema";

export const upUtil = async (modelUp: (Category | Level) & Document<any, any, any> &
{ _id: Types.ObjectId; },
    model: Model<CategoryDocument | LevelDocument, {}, {}, {}, any>, id: string) => {
    let orderUp = ++modelUp.order;
    let cateDowns = await model.find({ order: orderUp });

    //up
    let upResult = await model.findByIdAndUpdate(id, modelUp);
    //down
    let cateDown = cateDowns[0];
    let downResult: any;
    if (cateDown) {
        --cateDown.order;
        downResult = await model
            .findByIdAndUpdate(cateDown._id, cateDown);
    }

    return { up: upResult, down: downResult };
}

export const downUtil = async (objectDown: (Category | Level) & Document<any, any, any> &
{ _id: Types.ObjectId; }, model: Model<CategoryDocument | LevelDocument, {}, {}, {}, any>, id: string) => {
    let orderUp = --objectDown.order;
    let cateUps = await model.find({ order: orderUp });

    //down
    let downResult = await model.findByIdAndUpdate(id, objectDown);

    //up
    let cateUp = cateUps[0];
    let upResult: {};
    if (cateUp) {
        ++cateUp.order;
        upResult = await model.findByIdAndUpdate(cateUp._id, cateUp);
    }

    return { up: upResult, down: downResult };
}

// export const createOrder = async (model: Model<Document, {}, {}, {}, any>) => {
//     let items = await model.find().sort({ order: 'desc' });
//     let result = items[0].get('order');
//     return ++result;
// }

export const getOrderMax = async (model: Model<CategoryDocument | LevelDocument, {}, {}, {}, any>) => {
    let items = await model.find().sort({ order: 'asc' });

    let update = items.map(async (item, index) => {
        return await model.findByIdAndUpdate(item._id, { order: ++index });
    })
    console.log(update.length);

    return update.length;
}

