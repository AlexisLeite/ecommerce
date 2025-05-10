/**
 * @internal
 */ type Task = () => unknown;

/**
 * @internal
 */ type RunOrder = "fifo" | "filo";

/**
 * @public
 *
 * The `SerialEnqueuer` class provides a mechanism for managing tasks in a serial queue.
 * It allows tasks to be added to the queue and manages the execution order based on the specified running order.
 */
export class TaskSerialEnqueuer {
  /**
   * This member indicates wether the Enqueuer will continue running tasks or not.
   */
  protected enabled = true;
  /**
   * This member indicates wether the Enqueuer is running tasks or not.
   */
  protected isProcessing = false;
  /**
   * Here is where the tasks are stored for previous execution.
   */
  protected queue: Task[] = [];
  protected urgentQueue: Task[] = [];

  /**
   * This method is the one which performs the actual tasks execution
   */
  protected async process() {
    if (!this.enabled) {
      this.isProcessing = false;
      return;
    }

    let task = this.urgentQueue.shift();

    if (!task) {
      if (this.order === "fifo") {
        task = this.queue.shift();
      } else {
        task = this.queue.pop();
      }
    }

    await task?.();

    if (this.queue.length > 0) {
      this.process();
    } else {
      this.isProcessing = false;
    }
  }

  protected tryToProcess() {
    if (!this.isProcessing) {
      this.isProcessing = true;
      this.process();
    }
  }
  /**
   * Constructs a new instance of the SerialEnqueuer.
   * @param order - The running order of the tasks. Default is "fifo" (First-In-First-Out).
   *              Other possible values can be provided based on the `RunOrder` type.
   */
  constructor(protected order: RunOrder = "fifo") {}

  /**
   * Restores the Enqueuer's functionality after pausing it
   */
  continue() {
    this.enabled = true;
  }
  /**
   * When paused, the Enqueuer wont run any future task. This method doesn't pause the current running task.
   */
  pause() {
    this.enabled = true;
  }

  /**
   * Adds a new task to the queue.
   *
   * @param task - The task to be added to the queue. The task should conform to the `Task` type.
   */
  push(task: Task) {
    this.queue.push(task);
    void this.tryToProcess();
  }

  /**
   * Sets the order in which tasks in the queue are run.
   * @param order - The running order to be set for the task queue. This should be of the `RunOrder` type.
   */
  setOrder(order: RunOrder) {
    this.order = order;
  }

  /**
   * Adds a task to a priority queue, which is processed in a first-in-first-out (FIFO) order.
   * This priority queue is considered before the main task queue, ensuring urgent tasks are handled promptly.
   *
   * @param task - The task to be enqueued. It must comply with the `Task` interface specifications.
   *               The task will be executed based on the FIFO principle within the priority queue.
   */
  urgent(task: Task) {
    this.urgentQueue.push(task);
    void this.tryToProcess();
  }
}
