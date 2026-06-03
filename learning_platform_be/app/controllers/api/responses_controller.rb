class Api::ResponsesController < ApplicationController
  include Authenticable
  
  def create
    response = current_learner.responses.build(response_params)

    if response.save
      render json: response, status: :created
    else
      render json: {
        errors: response.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def response_params
    params.permit(
      :course_id,
      :content
    )
  end
end