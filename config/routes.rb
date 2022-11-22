Rails.application.routes.draw do
  resources :users, only: []
 


  #for deployed react-router to work
  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end

 # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

 
