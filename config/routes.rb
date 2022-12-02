Rails.application.routes.draw do
  resources :likes, only: [:create, :destroy]
  resources :activities, only: [:show, :create, :update, :destroy]
  resources :trips, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:update, :destroy]

  #custom single trip image handling routes
  get '/findImage/:id/:attachment_id', to: "trips#findImage"
  delete '/deleteImage/:id/:attachment_id', to: "trips#deleteImage"

  #unique User auth routes
  post '/signup', to: "users#create"
  get '/auth', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  #for image upload
  default_url_options :host => "http://localhost:3000"

  #for deployed react-router to work
  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end

 # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html


