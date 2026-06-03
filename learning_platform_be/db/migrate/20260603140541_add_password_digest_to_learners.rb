class AddPasswordDigestToLearners < ActiveRecord::Migration[7.2]
  def change
    add_column :learners, :password_digest, :string
  end
end
