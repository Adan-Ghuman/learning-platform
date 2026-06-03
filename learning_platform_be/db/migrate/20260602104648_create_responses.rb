class CreateResponses < ActiveRecord::Migration[7.2]
  def change
    create_table :responses do |t|
      t.references :learner, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.text :content, null: false

      t.timestamps
    end

    add_index :responses,
              [:learner_id, :course_id],
              unique: true
  end
end