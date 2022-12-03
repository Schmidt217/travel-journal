class RemoveLikeValueFromTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :likes, :value
  end
end
