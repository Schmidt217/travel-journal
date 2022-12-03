class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :trip_id
  has_one :user
  has_one :trip
  
end
