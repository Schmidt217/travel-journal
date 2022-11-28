class Activity < ApplicationRecord
  belongs_to :trip

  validates :title, :category, :description, :trip_id, presence: true
  
end
