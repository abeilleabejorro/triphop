class AddColumnToTrips < ActiveRecord::Migration
  def change
  	add_column :trips, :admin_id, :integer
  end
end
