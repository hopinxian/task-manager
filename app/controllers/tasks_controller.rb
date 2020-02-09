class TasksController < ApplicationController
  def index
    tasks = Task.order(deadline: :asc)
    render json: tasks
  end

  def show
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def create
    task = Task.create!(task_params)

    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    render json: @task
  end

  def destroy
    task&.destroy
    render json: { message: 'Task completed!' }
  end

  def search
    @tasks = Task.order(deadline: :asc)
    @tasks = @tasks.where("tag LIKE ?", "%" + params[:searchTag] + "%") if params[:searchTag].present?
    @tasks = @tasks.where("deadline < ?", params[:searchDeadline]) if params[:searchDeadline].present?
    @tasks = @tasks.where("title LIKE ?", "%" + params[:searchTitle] + "%") if params[:searchTitle].present?
    render json: @tasks
  end

  private
  def task_params
    params.require(:task).permit(:title, :description, :tag, :deadline, :completed)
  end

  def task
    @task ||= Task.find(params[:id])
  end
end
