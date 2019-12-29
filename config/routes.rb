Rails.application.routes.draw do
  get 'welcome/index'

  resources :tasks
  resources :searches

  root 'tasks#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
