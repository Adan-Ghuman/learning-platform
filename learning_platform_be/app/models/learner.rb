class Learner < ApplicationRecord
  has_many :responses, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end