class RenameActivityTypeColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :activities, :type, :activity_type
  end
end
