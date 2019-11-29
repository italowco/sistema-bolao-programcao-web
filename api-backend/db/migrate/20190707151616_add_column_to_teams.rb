class AddColumnToTeams < ActiveRecord::Migration[5.1]
  def change
    add_column :teams, :divisao, :string
  end
end
