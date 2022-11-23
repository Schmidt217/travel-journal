class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :title, :type, :description
  has_one :trip
end
