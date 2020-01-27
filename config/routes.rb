Rails.application.routes.draw do
  #get 'welcome/index'

  get 'tasks/index'
  post 'tasks/create'
  get '/show/:id', to: 'tasks#show'
  delete '/destroy/:id', to: 'tasks#destroy'
  patch '/update/:id', to: 'tasks#update'
  post '/search', to: 'tasks#search'

  root 'welcome#index'
  get '/*path' => 'tasks#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
