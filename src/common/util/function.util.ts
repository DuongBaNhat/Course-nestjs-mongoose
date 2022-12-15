import { Document, Types, Model } from "mongoose";
import { async } from "rxjs";
import { Category, CategoryDocument } from "src/database/entities/category.schema";

export const upUtil = async (modelUp: Category & Document<any, any, any> &
{ _id: Types.ObjectId; },
    model: Model<CategoryDocument, {}, {}, {}, any>, id: string) => {
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

export const downUtil = async (objectDown: Category & Document<any, any, any> &
{ _id: Types.ObjectId; }, model: Model<CategoryDocument, {}, {}, {}, any>, id: string) => {
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