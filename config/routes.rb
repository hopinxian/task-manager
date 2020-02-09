Rails.application.routes.draw do

  get 'tasks/index'
  post 'tasks/create'
  get '/show/:id', to: 'tasks#show'
  delete '/destroy/:id', to: 'tasks#destroy'
  patch '/update/:id', to: 'tasks#update'
  post '/search', to: 'tasks#search'

  root 'welcome#index'
  # all other path requests leads to the empty index function of welcome controller
  get '/*path' => 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
