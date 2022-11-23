class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :date, :details, :private, :activities
  has_one :user

  def activities
    self.object.activities.map do |act|
      {activity: act}
    end
  end

end
