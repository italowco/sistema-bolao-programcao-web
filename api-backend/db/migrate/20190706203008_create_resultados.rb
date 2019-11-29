class CreateResultados < ActiveRecord::Migration[5.1]
  def change
    create_table :resultados do |t|
      t.integer :rodada_id
      t.integer :partida_id
      t.string :resultado

      t.timestamps
    end
  end
end
