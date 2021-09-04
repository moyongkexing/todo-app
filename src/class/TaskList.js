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
    console.log("===================================")
    console.log("swap(" + idA + "," + idB + ")が呼ばれた");
    let taskA = this.findById(idA);
    let taskB = this.findById(idB);
  
    console.log("taskAのid: " + taskA.id);
    console.log("taskBのid: " + taskB.id);

    let tempANext = taskA.next;
    let tempAPrev = taskA.prev;
    
    switch(taskA) {
      case taskB.prev:
        taskA.next = taskB.next;
        taskA.prev = taskB;

        taskB.next = taskA;
        taskB.prev = tempAPrev;
        break;

      case taskB.next:
        taskA.next = taskB;
        taskA.prev = taskB.prev;

        taskB.next = tempANext;
        taskB.prev = taskA;
        break;

      default:
        taskA.next = taskB.next;
        taskA.prev = taskB.prev;

        taskB.next = tempANext;
        taskB.prev = tempAPrev;
    }

    const debug = (task) => {
      if(task !== null) return `: ${task.id}`;
      else return ": null";
    }

    const printAB = () => {
      console.log("--------------------------")
      console.log("taskA" + debug(taskA))
      console.log("taskA.next" + debug(taskA.next))
      console.log("taskA.prev" + debug(taskA.prev))
      console.log("");
      console.log("taskB" + debug(taskB))
      console.log("taskB.next" + debug(taskB.next))
      console.log("taskB.prev" + debug(taskB.prev))
      console.log("");
      console.log("this.head" + debug(this.head));
      console.log("this.tail" + debug(this.tail));
    }

    printAB();
    [taskA, taskB].forEach(task => {
      if(task.prev === null) {
        this.head = task;
        this.head.next = task.next;
      }
      else if(task.next === null) {
        this.tail = task;
        this.tail.prev = task.prev;
      }
    })
    printAB();
  
    console.log("リスト内全要素のid: [" + this.print() + "]");
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

  isHead(task) {
    return task.prev === null;
  }

  isTail(task) {
    return task.next === null;
  }
}
