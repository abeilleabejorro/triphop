class CreateAccomodations < ActiveRecord::Migration
  def change
    create_table :accomodations do |t|
      t.string :type

      t.timestamps null: false
    end
  end
end
