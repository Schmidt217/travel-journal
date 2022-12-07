class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :bio, :avatar_format
  has_many :trips

  #create extra method to send along in attributes
  #merge insisde the url from the object
  #need this url to display the image back on the frontend 
  def avatar_format
    return unless object.avatar.attached?
    object.avatar.blob.attributes
      .slice('filenamme', 'byte_size')
      .merge(url: object.image_url)
      .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  end

  # def attachment_format
  #   return unless object.attachment.attached?
  #   object.attachment.blob.attributes
  #     .slice('filenamme', 'byte_size')
  #     .merge(url: object.image_url)
  #     .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  # end

end
