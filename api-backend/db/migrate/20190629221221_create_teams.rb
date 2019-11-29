class CreateTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :teams do |t|
      t.string :sigla
      t.string :name
      t.string :escudo

      t.timestamps
    end
  end
end
