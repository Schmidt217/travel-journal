class Trip < ApplicationRecord
  belongs_to :user
  has_many :activities

  validates :name, :location, :date, :details, :user_id, presence: true

end
