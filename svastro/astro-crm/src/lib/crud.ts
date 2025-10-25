import { pb } from "../lib/pb"
// POCKETBASE CRUD LIBRARY

// CREATE
// create new item in collection from data {x:"", y:"", ...}


// READ
// return a collection as an array
export async function GET_Items(target_collection: string): Promise<any[]>  {
    try {
        const records: any[] = await pb.collection(target_collection).getFullList(200, {
            sort: '-created',
        });
        return records;
    }
    catch(err) {
        console.log("error getting collection ", target_collection)
        return [];
    }
    
}

export async function GET_Item(target_collection: string, id: string): Promise<any>  {
    console.log(target_collection, id, "shots")
    try {
        const record: any = await pb.collection(target_collection).getOne(id)
        return record;
    }
    catch(err) {
        console.log("error getting collection ", target_collection)
        return [];
    }
    
}

// UPDATE
// update a single field in an item
export async function UPDATE_Item(target_collection: string, id: string, field: string, newValue: any) {
    const obj = { [field]: newValue };
    try {
        const updated = await pb.collection(target_collection).update(id, obj);
        console.log("updated")
    } 
    catch (err) {
        console.log(err)
    }
}

// DELETE 
// delete item in collection based on id
export async function DELETE_Item(target_collection: string, id: string) {
    try {
        await pb.collection(target_collection).delete(id);
        console.log("deleted!", target_collection,":",id)
    }
    catch (err) {
        console.log(err)
    }
}