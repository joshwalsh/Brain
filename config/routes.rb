Brain::Application.routes.draw do
  devise_for :users

  root 'atoms#index'

  get 'setup' => 'onboarding#setup', as: :setup

  resources :atoms
  resources :connections
end
