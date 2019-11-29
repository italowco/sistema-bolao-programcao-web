class CreateBilhetes < ActiveRecord::Migration[5.1]
  def change
    create_table :bilhetes do |t|
      t.integer :rodada_id
      t.integer :partida_id
      t.integer :numero
      t.string :resultado

      t.timestamps
    end
  end
end
