class AnotherRenameActivityTypeColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :activities, :activity_type, :category
  end
end
