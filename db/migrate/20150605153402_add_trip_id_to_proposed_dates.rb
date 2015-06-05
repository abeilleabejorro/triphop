class AddTripIdToProposedDates < ActiveRecord::Migration
  def change
  	add_column :proposed_dates, :trip_id, :integer
  end
end
