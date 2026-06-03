class Course < ApplicationRecord
  has_many :responses, dependent: :destroy
   enum :status, {
    published: "published",
    archived: "archived"
  }
  validates :title, presence: true, uniqueness: true
  validates :description, presence: true
  validates :status, presence: true
end
