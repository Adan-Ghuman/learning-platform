Rails.application.routes.draw do
  namespace :api do
    post :login, to: 'sessions#create'
    
    resources :courses, only: %i[index show]
    resources :responses, only: %i[create]

    # /api/learners/me/responses
    resource :learners, only: [] do
      get 'me/responses', to: 'learners#my_responses', as: :my_responses
    end
  end
end