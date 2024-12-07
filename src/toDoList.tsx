import React, { ChangeEventHandler, useState, useEffect } from "react";
import "./App.css";
import { GroceryItem } from "./types";
import { dummyLists } from "./constant";
import { useParams } from "react-router-dom";

export function ToDoList() {
  const { name } = useParams<{ name: string }>();
  const [items, setItems] = useState<GroceryItem[]>(() => dummyLists[name ?? "default"] || []);
  const [numBoughtItems, setNumBoughtItems] = useState(0);

  useEffect(() => {
    // Update items dynamically when name changes
    if (name && dummyLists[name]) {
      setItems(dummyLists[name]);
    } else if (!name || !dummyLists[name]) {
      setItems(dummyLists["default"]);
    }
  }, [name]);

  useEffect(() => {
    const boughtItems = items.filter((item) => item.isPurchased).length;
    setNumBoughtItems(boughtItems);
  }, [items]);

  function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, isPurchased: checked } : item
      )
    );
  }

  return (
    <div className="todo-list-container">
      <div className="todo-list-body">
        <h1>{name ? `${name}'s To Do List` : "To Do List"}</h1>
        <p className="todo-list-summary">Items bought: {numBoughtItems}</p>
        <form className="todo-list-form">
          {items.map((item) => (
            <ListItem key={item.name} item={item} changeHandler={handleCheckboxClick} />
          ))}
        </form>
      </div>
    </div>
  );
}

function ListItem({ item, changeHandler }: { item: GroceryItem; changeHandler: ChangeEventHandler }) {
  return (
    <div className="todo-list-item">
      <input
        type="checkbox"
        onChange={changeHandler}
        checked={item.isPurchased}
        name={item.name}
        className="todo-list-checkbox"
      />
      <label className={item.isPurchased ? "todo-item-purchased" : "todo-item-pending"}>
        {item.name}
      </label>
    </div>
  );
}
