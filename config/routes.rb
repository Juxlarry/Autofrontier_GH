Rails.application.routes.draw do
  get 'home/index'
  resources :car_models
  resources :car_makes
  resources :car_transmissions
  resources :car_colours
  resources :car_bodies
  resources :fuel_types
  resources :car_types
  resources :cars

  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
