class CreateCourses < ActiveRecord::Migration[7.2]
  def change
    create_table :courses do |t|
      t.string :title, null: false
      t.text :description
      t.string :status, null: false, default: "archived"

      t.timestamps
    end

    add_index :courses, :title, unique: true
  end
end