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
    @search = Search.new(search_params)
    @tasks = Task.order(deadline: :asc)
    @tasks = Task.where("tag LIKE ?", "%" + @search.keyword + "%") if @search.keyword.present?
    @tasks = @tasks.where("deadline < ?", @search.deadline) if @search.deadline.present?
    render json: @tasks
  end

  private
  def task_params
    params.require(:task).permit(:title, :description, :tag, :deadline)
  end

  def search_params
    params.require(:search).permit(:keyword, :deadline)
  end

  def task
    @task ||= Task.find(params[:id])
  end
end
