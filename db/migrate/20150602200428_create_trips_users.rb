class CreateTripsUsers < ActiveRecord::Migration
  def change
    create_table :trips_users do |t|
      t.integer :trip_id
      t.integer :user_id
    end
  end
end
