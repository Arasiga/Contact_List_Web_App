class Contacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.references :user
      t.string :name
      t.string :email
      t.string :phone
      t.string :message
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
