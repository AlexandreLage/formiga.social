class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :post_type
      t.string :title
      t.string :description
      t.datetime :date
      t.string :maps_marker
      t.string :city
      t.string :state
      t.string :address1
      t.string :address2
      t.integer :number
      t.string :issue_type
      t.boolean :issue_solved

      t.timestamps
    end
  end
end
