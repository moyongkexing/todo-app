export class TaskList {
  static id = 1;

  constructor(task) {
    this.head = task;
    this.tail = this.head;
  };

  append(task) {
    this.tail.next = task;
    task.next = null;
    task.prev = this.tail;
    this.tail = task;
  };
  
  popFront() {
    this.head = this.head.next;
    if(this.head !== null) {
      this.head.prev = null;
    }
  }

  pop() {
    this.tail = this.tail.prev;
    if(this.tail !== null) {
      this.tail.next = null;
    }
  }

  delete(id) {
    const task = this.findById(id);
      switch(task) {
        case this.head: 
          this.popFront();
          break;
        case this.tail: 
          this.pop();
          break;
        default: 
          task.prev.next = task.next;
          task.next.prev = task.prev;
      }
  }

  findById(id) {
    id = Number(id);
    let task = this.head;
    while(task.id !== id) {
      task = task.next;
      if(task === null) return null;
    }
    return task;
  }

  print() {
    let task = this.head;
    let arr = [];
    while(task !== null) {
      arr.push(task.id);
      task = task.next;
    }
    return arr;
  }
  
  swap(idA, idB) {
    console.log("swap(" + idA + ", " + idB + ")が呼ばれた");
    let taskA = this.findById(idA);
    let taskB = this.findById(idB);
  
    console.log("taskAのid: " + taskA.id);
    console.log("taskBのid: " + taskB.id);

    let tempA = taskA;
    let tempANext = taskA.next;
    let tempAPrev = taskA.prev;

    switch(taskA.id) {
      case taskB.prev.id:
        taskA.next = taskB.next;
        taskA.prev = taskB;
        taskB.next = tempA; // taskAでもいいかも
        taskB.prev = tempAPrev;
        break;
      case taskB.next.id:
        taskA.next = taskB;
        taskA.prev = taskB.prev;
        taskB.next = tempANext;
        taskB.prev = tempA; // taskAでもいいかも
        break;
      default:
        taskA.next = taskB.next;
        taskA.prev = taskB.prev;
        taskB.next = tempANext;
        taskB.prev = tempAPrev;
    }
  }

  filter(category) {
    let task = this.head;
    let arr = [];

    while(task !== null && task.category === category) {
      arr.push({
        id: task.id,
        content: task.content,
        date: task.date.join(""),
      });
      task = task.next;
    };
    return arr;
  }
}
