Brain::Application.routes.draw do
  devise_for :users
  resources :atoms
  resources :connections

  root 'application#boot'

  get 'setup' => 'onboarding#setup', as: :setup
end
