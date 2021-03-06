Rails.application.routes.draw do
  resources :newsletter_requests
  resources :vehicleenquiries
  devise_for :users
  resources :roles
  resources :vehicle_types
  resources :car_drives
  resources :car_cylinders
  resources :car_engines
  resources :car_documents
  resources :car_models
  resources :car_makes
  resources :car_transmissions
  resources :car_colours
  resources :car_bodies
  resources :fuel_types
  resources :car_types
  resources :cars

  root 'home#welcome'

  get 'dashboard' => 'home#index'

  get 'new_user_cars' => 'cars#new_user_cars'

  get 'used_user_cars' => 'cars#used_user_cars'

  get 'sell_cars' => 'home#car_sell'

  get 'show_cars' => 'cars#show'

  get 'value_cars' => 'home#car_value'

  get 'used_cars' => 'home#used_cars'

  get 'new_cars' => 'home#new_cars'

  get 'userform' => 'home#stepform'

  get '/users' => 'users#index'

  get '/users/new' => 'users#new', :as => 'new_user'
  get '/users/:id/edit' => 'users#edit', :as => 'edit_user'
  get '/users/:id' => 'users#show', :as => 'user'
  patch '/users/:id' => 'users#update', :as => 'update_user'

  post 'create_user' => 'users#create', as: :create_user

  get  'make_enquiry' => 'cars#make_enquiry'

  get  'view_enquiry' => 'vehicleenquiries#view_enquiry'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
