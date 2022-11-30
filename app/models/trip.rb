class Trip < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :user
  has_many :activities, dependent: :destroy
  has_many_attached :images

  validates :name, :location, :date, :details, :user_id, presence: true

  validates :images, content_type: [:png, :jpg, :jpeg], size: { less_than: 3.megabytes , message: 'is too large' }

  #helps us store locally during development 
  # def image_urls
  #   images.map{ |img| Rails.application.routes.url_helpers.url_for(img)}
  # end

  def image_url(img)
    url_for(img)
  end

end
