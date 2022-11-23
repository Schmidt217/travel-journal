class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.string :name
      t.string :location
      t.string :date
      t.string :details
      t.boolean :private
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
