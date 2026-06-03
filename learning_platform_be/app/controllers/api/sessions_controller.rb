class Api::SessionsController < ApplicationController
  def create
    learner = Learner.find_by(email: params[:email])

    if learner&.authenticate(params[:password])
      token = JsonWebToken.encode(learner_id: learner.id)
      render json: { token: token, learner: { id: learner.id, name: learner.name, email: learner.email } }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
end
