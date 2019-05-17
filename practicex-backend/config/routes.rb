Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      get '/users/:id/test_attempts', to: 'users#test_attempts'
      get '/users/:id/', to: 'users#show'
      get '/test_attempts/recent', to: 'test_attempts#recent'
      get '/test_attempts/history', to: 'test_attempts#history'
      post '/test_attempts/grade', to: 'test_attempts#grade'
      resources :test_attempts, only: [:index, :create, :show]
      resources :section_attempts, only: [:update]
      resources :tests
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
    end
  end
end
