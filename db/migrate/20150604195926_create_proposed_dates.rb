class CreateProposedDates < ActiveRecord::Migration
  def change
    create_table :proposed_dates do |t|
      t.datetime :start
      t.datetime :end

      t.timestamps null: false
    end
  end
end
