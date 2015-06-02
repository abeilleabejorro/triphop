class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.string :name
      t.string :description
      t.string :origin
      t.string :destination

      t.timestamps null: false
    end
  end
end
