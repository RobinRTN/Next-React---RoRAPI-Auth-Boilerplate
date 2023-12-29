Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  devise_scope :user do
    post 'social_auth_google/callback', to: 'users/socials#authenticate_google'
    post 'social_auth_facebook/callback', to: 'users/socials#authenticate_facebook'
  end

  namespace :v1 do
    get 'users/check_username', to: 'users#check_username'
    patch 'users/update_username', to: 'users#update_username'
  end


end
