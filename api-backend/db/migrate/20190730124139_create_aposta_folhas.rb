class CreateApostaFolhas < ActiveRecord::Migration[5.1]
  def change
    create_table :aposta_folhas do |t|
      t.integer :partida_id
      t.integer :rodada_id
      t.string :numero
      t.timestamps
    end
  end
end
