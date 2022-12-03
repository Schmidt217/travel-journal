class TripSerializer < ActiveModel::Serializer
  # include Rails.application.routes.url_helpers
  attributes :id, :name, :location, :date, :details, :private, :activities, :images_format
  has_many :likes
  has_one :user

  def activities
    self.object.activities.map do |act|
      {activity: act}
    end
  end

  def images_format
    return unless object.images.attached?
    object.images.map do |img|
      img.blob.attributes
      .slice('filenamme', 'byte_size', 'id')
      .merge(url: object.image_url(img))
      .tap { |attrs| attrs['name'] = attrs.delete('filename') }
    end
  end

end
