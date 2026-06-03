class Response < ApplicationRecord
  belongs_to :learner
  belongs_to :course

  validates :content, presence: true

  validates :learner_id,
          uniqueness: {
            scope: :course_id,
            message: "has already submitted a response for this course"
          }
end