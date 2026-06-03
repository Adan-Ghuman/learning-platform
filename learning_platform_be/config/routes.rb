Rails.application.routes.draw do
  namespace :api do
    resources :courses, only: %i[index show]
    resources :responses, only: %i[create]

    resources :learners, only: [] do
      get :responses, on: :member
    end
  end
end