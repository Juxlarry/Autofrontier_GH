Rails.application.routes.draw do
  devise_for :users
  resources :vehicle_types
  resources :car_drives
  resources :car_cylinders
  resources :car_engines
  resources :car_documents
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

  get 'sell_cars' => 'home#car_sell'

  get 'value_cars' => 'home#car_value'

  get 'used_cars' => 'home#used_cars'

  get 'new_cars' => 'home#new_cars'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
