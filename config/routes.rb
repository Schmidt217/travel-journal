Rails.application.routes.draw do
  resources :activities, only: []
  resources :trips, only: []
  resources :users, only: []

  #unique User auth routes
  post '/signup', to: "users#create"
  get '/auth', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  #for deployed react-router to work
  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end

 # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html


