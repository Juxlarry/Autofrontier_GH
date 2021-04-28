class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception


  # protect_from_forgery with: :null_session

  # protect_from_forgery except: []


  # before_action :authenticate_user!
  # before_filter :authenticate_user!

  add_flash_types :success, :warning, :danger, :info

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

   protected

  def configure_permitted_parameters
     # devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :fullname, :email, :password, :password_confirmation, :role_id) }
     # devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username,:login, :password) }
     # devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :fullname, :email, :password, :password_confirmation, :current_password,:role_id,) }

     
    added_attrs = [:username, :firstname, :othernames, :email, :password, :password_confirmation, :role_id, :remember_me]
    devise_parameter_sanitizer.permit(:sign_up, keys: added_attrs)
    devise_parameter_sanitizer.permit(:sign_in, keys: added_attrs)
    devise_parameter_sanitizer.permit(:account_update, keys: added_attrs)
  end
end
