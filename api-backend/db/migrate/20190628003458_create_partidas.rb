class CreatePartidas < ActiveRecord::Migration[5.1]
  def change
    create_table :partidas do |t|
      t.integer :visitante_id
      t.integer :mandante_id

      t.timestamps
    end
  end
end
