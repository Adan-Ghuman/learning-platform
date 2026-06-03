class CreateLearners < ActiveRecord::Migration[7.2]
  def change
    create_table :learners do |t|
      t.string :name, null: false
      t.string :email, null: false

      t.timestamps
    end

    add_index :learners, :email, unique: true
  end
end
