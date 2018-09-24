Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #

  scope '/api' do
    resources :posts
    post '/attach_picture', to: 'posts#attach_picture', controller: 'posts'
  end


end
