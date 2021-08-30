import { TaskList } from "./TaskList.js";

export class Task {
  constructor(title, content, category) {
    this.title = title,
    this.content = content;
    this.category = category;

    this.id = TaskList.id;
    TaskList.id++;

    const date = new Date();
    this.date = [
      date.getFullYear(),"年",
      date.getMonth() + 1,"月",
      date.getDate(),"日",
      " ",
      date.getHours(),"時",
      date.getMinutes(),"分",
      date.getSeconds(),"秒"
    ];

    this.prev = null;
    this.next = null;
  }

  updateCategory(newCategory) {
    this.category = newCategory;
  }
};
