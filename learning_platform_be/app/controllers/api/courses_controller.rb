class Api::CoursesController < ApplicationController
  def index
    courses = Course.published

    render json: courses
  end

  def show
      course = Course.find_by(id: params[:id])

  return render json: {
    error: "Course not found"
  }, status: :not_found unless course

  render json: course
  end
end