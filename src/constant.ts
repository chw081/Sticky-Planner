//Constant.ts
import { Label } from "./types";
import { GroceryItem } from "./types";

export const dummyNotesList = [
    {
        id: 1,
        title: "test note 1 title",
        content: "test note 1 content",
        label: Label.other,
    },
    {
        id: 2,
        title: "test note 2 title",
        content: "test note 2 content",
        label: Label.personal,
    },
    {
        id: 3,
        title: "test note 3 title",
        content: "test note 3 content",
        label: Label.work,
    },
    {
        id: 4,
        title: "test note 4 title",
        content: "test note 4 content",
        label: Label.study,
    },
    {
        id: 5,
        title: "test note 5 title",
        content: "test note 5 content",
        label: Label.study,
    },
    {
        id: 6,
        title: "test note 6 title",
        content: "test note 6 content",
        label: Label.personal,
    },
 ]
 
export const dummyLists: Record<string, GroceryItem[]> = {
    default: [
      { name: "Apples", isPurchased: false },
      { name: "Bananas", isPurchased: false },
    ],
    weekend: [
      { name: "Milk", isPurchased: false },
      { name: "Bread", isPurchased: false },
      { name: "Eggs", isPurchased: false },
    ],
    errands: [
      { name: "Pick up laundry", isPurchased: false },
      { name: "Buy stamps", isPurchased: false },
    ],
};