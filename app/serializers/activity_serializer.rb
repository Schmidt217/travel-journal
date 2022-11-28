class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :title, :category, :description
  has_one :trip
end
