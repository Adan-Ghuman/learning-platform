class Api::CoursesController < ApplicationController
  include Authenticable
  skip_before_action :authenticate_request!, only: [:index, :show]

  def index
    courses = Course.published
    render json: courses
  end

  def show
    course = Course.find_by(id: params[:id])

    return render json: {
      error: "Course not found"
    }, status: :not_found unless course

    response_data = nil
    if current_learner
      learner_response = current_learner.responses.find_by(course_id: course.id)
      response_data = learner_response.as_json(only: [:id, :content, :created_at]) if learner_response
    end

    render json: course.as_json.merge(response: response_data)
  end
end