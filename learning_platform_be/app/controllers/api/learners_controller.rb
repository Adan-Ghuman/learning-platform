class Api::LearnersController < ApplicationController
  include Authenticable
  
  def my_responses
    responses = current_learner.responses.includes(:course)

    render json: responses.as_json(
      include: :course
    )
  end
end