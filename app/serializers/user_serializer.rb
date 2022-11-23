class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :bio
  has_many :trips

end
