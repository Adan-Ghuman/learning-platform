module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request!
  end

  private

  def authenticate_request!
    unless current_learner
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def current_learner
    return @current_learner if @current_learner

    header = request.headers['Authorization']
    header = header.split(' ').last if header

    decoded = JsonWebToken.decode(header)
    if decoded
      @current_learner = Learner.find_by(id: decoded[:learner_id])
    end
  end
end
