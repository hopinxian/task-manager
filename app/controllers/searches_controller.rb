class SearchesController < ApplicationController

  def new
  end

  def create
    @search = Search.new(search_params)
    @tasks = Task.order(deadline: :asc)
    @tasks = Task.where("tag LIKE ?", "%" + @search.keyword + "%") if @search.keyword.present?
    @tasks = @tasks.where("deadline < ?", @search.deadline) if @search.deadline.present?
    render 'tasks/index'
  end

  private
  def search_params
    params.require(:search).permit(:keyword, :deadline)
  end
end
