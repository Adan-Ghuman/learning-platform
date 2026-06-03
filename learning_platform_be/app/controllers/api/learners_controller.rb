class Api::LearnersController < ApplicationController
  def responses
  learner = Learner.find(params[:id])

  responses = learner.responses.includes(:course)

  render json: responses.as_json(
    include: :course
  )
end
end