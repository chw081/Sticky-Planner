import React, { ChangeEventHandler, useState, useEffect } from "react";
import "./App.css";
import { GroceryItem } from "./types";
import { dummyLists } from "./constant";
import { useParams } from "react-router-dom";

export function ToDoList() {
  const { name } = useParams<{ name: string }>();
  const [items, setItems] = useState<GroceryItem[]>(() => dummyLists[name ?? "default"] || []);
  const [numBoughtItems, setNumBoughtItems] = useState(0);
  const [newItemName, setNewItemName] = useState("");

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

  function handleNewItemChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewItemName(e.target.value);
  }

  function handleAddNewItem() {
    if (newItemName.trim() === "") return; // Prevent adding empty items
    const newItem: GroceryItem = { name: newItemName.trim(), isPurchased: false };
    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName(""); // Clear the input field after adding
  }

  return (
    <div className="todo-list-container">
      <div className="todo-list-body">
        <h1>{name ? `${name}'s To Do List` : "To Do List"}</h1>
        <p className="todo-list-summary">Items bought: {numBoughtItems}</p>
        <form className="todo-list-form">
          {items
            .slice() // Create a copy of the items array to avoid mutating the state
            .sort((a, b) => Number(a.isPurchased) - Number(b.isPurchased)) // Sort unchecked first
            .map((item) => (
              <ListItem key={item.name} item={item} changeHandler={handleCheckboxClick} />
            ))}
        </form>
        <div className="todo-list-add-item">
          <input
            type="text"
            value={newItemName}
            onChange={handleNewItemChange}
            placeholder="Add new item"
            className="todo-list-new-item-input"
          />
          <button type="button" onClick={handleAddNewItem} className="todo-list-add-button">
            Add
          </button>
        </div>
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
