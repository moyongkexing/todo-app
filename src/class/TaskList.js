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
  
  printAll() {
    let task = this.head;
    let arr = [];
    while(task !== null) {
      arr.push({
        data: this.debug(task),
        next: this.debug(task.next),
        prev: this.debug(task.prev),
      })
      task = task.next;
    }
    return arr;
  }

  debug(task) {
    if(task !== null) return `: ${task.id}`;
    else return ": null";
  }
  swap(idA, idB) {
    console.log("===================================")
    console.log("swap(" + idA + "," + idB + ")が呼ばれた");
    let taskA = this.findById(idA);
    let taskB = this.findById(idB);

    let tempANext = taskA.next;
    let tempAPrev = taskA.prev;

    console.log(this.printAll());
    
    switch(taskA) {
      case taskB.prev:
        console.log("taskAはtaskBの前")

        taskA.next = taskB.next;
        taskA.prev = taskB;

        taskB.next = taskA;
        taskB.prev = tempAPrev;
        taskA.prev.next = taskB;
        break;

      case taskB.next:
        console.log("taskAはtaskBの次")
        taskA.next = taskB;
        taskA.prev = taskB.prev;

        taskB.next = tempANext;
        taskB.prev = taskA;
        break;

      default:
        console.log("taskAとtaskBは離れてる")
        taskA.next = taskB.next;
        taskA.prev = taskB.prev;

        taskB.next = tempANext;
        taskB.prev = tempAPrev;
    }

    console.log(this.printAll());
  }

  filter(category) {
    let task = this.head;
    let arr = [];

    while(task !== null && task.category === category) {
      arr.push({
        id: task.id,
        title: task.title,
        content: task.content,
        date: task.date.join(""),
      });
      task = task.next;
    };
    return arr;
  }

  isHead(task) {
    return task.prev === null;
  }

  isTail(task) {
    return task.next === null;
  }
}
