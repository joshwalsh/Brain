Brain::Application.routes.draw do
  devise_for :users

  root 'application#boot'

  get 'setup' => 'onboarding#setup', as: :setup

  namespace :api do
    namespace :v1 do
      resources :atoms
      resources :connections
    end
  end
end
