import { Task } from "../class/Task.js";
import { TaskList } from "../class/TaskList.js";

export const CategoryWrapper = {
  template: `
    <div class="categoryWrapper">
      <p class="categoryTitle">{{ category }}</p>

      <form @submit.prevent="createTask">
        <input type="text" v-model="title" placeholder="タスク名">
        <textarea type="text" v-model="content" placeholder="詳細" rows="10"></textarea>
        <button type="submit">作成</button>
      </form>

      <div class="taskWrapper" v-if="taskExists" style="color: white;">
        <div
          v-for="task in tasks"
          @drop="dropTask($event, task.id)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div class="task" draggable @dragstart="dragTask($event, task.id)">
            <p class="">{{ task.id }}</p>
            <p class="taskTitle">{{ task.title }}</p>
            <p class="taskContent">{{ task.content }}</p>
            <p class="taskDate">{{ task.date }}</p>
            <i @click="deleteTask(task.id)" class="fas fa-trash"></i>
          </div>
        </div>
      </div>

      <p v-else style="color: white;">タスクないよ</p>
    </div>
  `,

  props: {
    category: String,
  },

  data: function() {
    return {
      title: "",
      content: "",
      taskList: null,
    }
  },

  computed: {
    taskExists: function() {
      return this.taskList !== null && this.taskList.head !== null;
    },

    tasks: function() {
      if(this.taskExists) {
        return this.taskList.filter(this.category);
      }
    },
  },

  methods: {
    createTask: function() {
      const task = new Task(
        this.title,
        this.content,
        this.category
      );

      if(!this.taskExists) {
        this.taskList = new TaskList(task);
      }
      else this.taskList.append(task);

      this.title = "";
      this.content = "";
    },

    deleteTask: function(id){
      this.taskList.delete(id);
    },

    dragTask: function(event, dragId) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("drag-id", dragId);
    },

    dropTask: function(event, dropId) {
      const dragId = Number(event.dataTransfer.getData("drag-id"));
      this.taskList.swap(dragId, dropId);
    }
  }
}
