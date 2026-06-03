class Api::ResponsesController < ApplicationController
  def create
    response = Response.new(response_params)

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
      :learner_id,
      :course_id,
      :content
    )
  end
end