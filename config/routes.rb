Brain::Application.routes.draw do
  resources :atoms
  resources :connections

  root 'application#boot'

  get 'setup' => 'onboarding#setup', as: :setup
end
